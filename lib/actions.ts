"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import logger from "@/lib/logger";
import { projects, projectsToTags } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";

// Validation Schema
const ProjectSchema = z.object({
    slug: z
        .string()
        .min(3)
        .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphenated"),
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
    // Transform "1,2,3" string into array [1, 2, 3] of numbers
    tags: z
        .string()
        .transform((str) => (str ? str.split(",").map(Number) : [])),
});

export async function createProject(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        return { message: "Unauthorized" };
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = ProjectSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Project.",
        };
    }

    const { data } = validatedFields;
    const { tags, ...projectData } = data;

    try {
        await db.transaction(async (tx) => {
            const newProject = await tx
                .insert(projects)
                .values(projectData)
                .returning({ id: projects.id });

            const projectId = newProject[0].id;

            if (tags && tags.length > 0) {
                await tx.insert(projectsToTags).values(
                    tags.map((tagId: number) => ({
                        projectId,
                        tagId,
                    }))
                );
            }

            logger.info("Project created", {
                slug: data.slug,
                user: session.user?.email,
            });
        });
    } catch (error) {
        logger.error("Database Error: Failed to Create Project", { error });
        return { message: "Database Error: Failed to Create Project." };
    }

    revalidatePath("/en/projects");
    revalidatePath("/tr/projects");
    redirect("/en/admin");
}

const UpdateProjectSchema = ProjectSchema.extend({
    id: z.coerce.number(),
});

export async function updateProject(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        return { message: "Unauthorized" };
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = UpdateProjectSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Project.",
        };
    }

    const { data } = validatedFields;
    const { tags, id: projectId, ...projectData } = data;

    try {
        await db.transaction(async (tx) => {
            await tx
                .update(projects)
                .set(projectData)
                .where(eq(projects.id, projectId));

            await tx
                .delete(projectsToTags)
                .where(eq(projectsToTags.projectId, projectId));

            if (tags && tags.length > 0) {
                await tx.insert(projectsToTags).values(
                    tags.map((tagId: number) => ({
                        projectId,
                        tagId,
                    }))
                );
            }

            logger.info("Project updated", {
                slug: data.slug,
                user: session.user?.email,
            });
        });
    } catch (error) {
        logger.error("Database Error: Failed to Update Project.", {
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : null,
            error,
        });
        return {
            message:
                "Database Error: Failed to update. Check server logs for details.",
        };
    }

    revalidatePath("/en/projects");
    revalidatePath("/tr/projects");
    revalidatePath(`/en/projects/${data.slug}`);
    revalidatePath(`/tr/projects/${data.slug}`);
    redirect("/en/admin");
}

// New Contact Schema
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
