"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import logger from "@/lib/logger";
import { projects, projectsToTags, tags } from "@/lib/schema";
import { eq, inArray, type ExtractTablesWithRelations } from "drizzle-orm";
import { type PgTransaction } from "drizzle-orm/pg-core";
import { type VercelPgQueryResultHKT } from "drizzle-orm/vercel-postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";
import * as schema from "./schema";

// --- Type Alias for Transaction ---
type Transaction = PgTransaction<
    VercelPgQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
>;

// --- Helper Function for Tag Upsert ---
async function findOrCreateTags(tagNames: string[], tx: Transaction) {
    if (tagNames.length === 0) return [];

    const allDbTags = await tx.query.tags.findMany();
    const dbTagMap = new Map(allDbTags.map(t => [t.name.toLowerCase(), t]));

    const tagIds: number[] = [];
    const tagsToCreate: { name: string }[] = [];

    for (const name of tagNames) {
        const existingTag = dbTagMap.get(name.toLowerCase());
        if (existingTag) {
            tagIds.push(existingTag.id);
        } else {
            // Avoid adding duplicates to the create list
            if (!tagsToCreate.some(t => t.name.toLowerCase() === name.toLowerCase())) {
                 tagsToCreate.push({ name });
            }
        }
    }

    if (tagsToCreate.length > 0) {
        const newTags = await tx.insert(tags).values(tagsToCreate).returning({ id: tags.id });
        tagIds.push(...newTags.map(t => t.id));
    }

    return tagIds;
}

// --- Zod Schemas ---
const ProjectSchema = z.object({
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphenated"),
    title_en: z.string().min(1),
    description_en: z.string().min(1),
    body_en: z.string().min(1),
    title_tr: z.string().min(1),
    description_tr: z.string().min(1),
    body_tr: z.string().min(1),
    github_url: z.string().url().optional().or(z.literal("")),
    live_url: z.string().url().optional().or(z.literal("")),
    thumbnail_url: z.string().url().optional().or(z.literal("")),
    showOnHomepage: z.coerce.boolean(),
    tags: z.string().transform((str) => str.split(',').map(t => t.trim()).filter(Boolean)),
});

const UpdateProjectSchema = ProjectSchema.extend({
    id: z.coerce.number(),
});


// --- Server Actions ---

export async function createProject(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user) return { message: "Unauthorized" };

    const validatedFields = ProjectSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors, message: "Missing Fields. Failed to Create Project." };
    }

    const { tags: tagNames, ...projectData } = validatedFields.data;

    try {
        await db.transaction(async (tx) => {
            // Create the project
            const newProject = await tx.insert(projects).values(projectData).returning({ id: projects.id });
            const projectId = newProject[0].id;

            // Find or create tags and get their IDs
            const tagIds = await findOrCreateTags(tagNames, tx);

            // Link tags to the project
            if (tagIds.length > 0) {
                await tx.insert(projectsToTags).values(
                    tagIds.map((tagId: number) => ({ projectId, tagId }))
                );
            }

            logger.info("Project created", { slug: projectData.slug, user: session.user?.email });
        });
    } catch (error) {
        logger.error("Database Error: Failed to Create Project", { error });
        return { message: "Database Error: Failed to Create Project." };
    }

    revalidatePath("/admin");
    revalidatePath("/projects");
    redirect("/admin");
}


export async function updateProject(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user) return { message: "Unauthorized" };

    const validatedFields = UpdateProjectSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors, message: "Missing Fields. Failed to Update Project." };
    }

    const { id: projectId, tags: tagNames, ...projectData } = validatedFields.data;

    try {
        await db.transaction(async (tx) => {
            // Update the project
            await tx.update(projects).set(projectData).where(eq(projects.id, projectId));

            // Find or create tags and get their IDs
            const tagIds = await findOrCreateTags(tagNames, tx);
            
            // Sync the tags for the project
            await tx.delete(projectsToTags).where(eq(projectsToTags.projectId, projectId));
            if (tagIds.length > 0) {
                await tx.insert(projectsToTags).values(
                    tagIds.map((tagId: number) => ({ projectId, tagId }))
                );
            }

            logger.info("Project updated", { slug: projectData.slug, user: session.user?.email });
        });
    } catch (error) {
        logger.error("Database Error: Failed to Update Project.", { error });
        return { message: "Database Error: Failed to update. Check server logs for details." };
    }

    revalidatePath("/admin");
    revalidatePath("/projects");
    revalidatePath(`/projects/${projectData.slug}`);
    redirect("/admin");
}

// ... (sendContactEmail remains the same)
const ContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(
    prevState: {
        message?: string;
        errors?: Record<string, string[]>;
        success?: boolean;
    },
    formData: FormData
) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = ContactSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation Failed.",
            success: false,
        };
    }

    const { name, email, subject, message } = validatedFields.data;

    try {
        await resend.emails.send({
            from: "Contact Form <contact@hakanispir.dev>",
            to: "contact@hakanispir.dev",
            subject: `Portfolio Contact: ${subject}`,
            replyTo: email,
            html: `
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Subject: ${subject}</p>
                <p>Message: ${message}</p>
            `,
        });

        logger.info("Contact email sent", { name, email, subject });
        return { message: "Email sent successfully!", success: true };
    } catch (error) {
        logger.error("Failed to send contact email", { error });
        return {
            message: "Failed to send email. Please try again later.",
            success: false,
        };
    }
}
