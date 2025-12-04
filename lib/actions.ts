"use server";

import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import logger from "@/lib/logger";
import { projects } from "@/lib/schema";
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
    // Transform "tag1, tag2" string into array ["tag1", "tag2"]
    tags: z.string().transform((str) =>
        str
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
    ),
});

export async function createProject(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        return { message: "Unauthorized" };
    }

    // Parse raw FormData into an object
    const rawData = Object.fromEntries(formData.entries());

    // Validate
    const validatedFields = ProjectSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Project.",
        };
    }

    const { data } = validatedFields;

    try {
        await db.insert(projects).values({
            slug: data.slug,
            title_en: data.title_en,
            description_en: data.description_en,
            body_en: data.body_en,
            title_tr: data.title_tr,
            description_tr: data.description_tr,
            body_tr: data.body_tr,
            github_url: data.github_url || null,
            live_url: data.live_url || null,
            thumbnail_url: data.thumbnail_url || null,
            showOnHomepage: data.showOnHomepage,
            tags: data.tags,
        });

        logger.info("Project created", {
            slug: data.slug,
            user: session.user.email,
        });
    } catch (error) {
        logger.error("Database Error: Failed to Create Project", { error });
        return { message: "Database Error: Failed to Create Project." };
    }

    // We need to know the current locale to redirect correctly
    // In a server action, this is tricky, so we default to English or pass it in formData
    // For simplicity, we hardcode redirection to the dashboard

    revalidatePath("/en/projects");
    revalidatePath("/tr/projects");
    redirect("/en/admin");
}

// Schema for updating includes the ID
const UpdateProjectSchema = ProjectSchema.extend({
    id: z.coerce.number(), // Coerce string from FormData to number
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

    try {
        await db
            .update(projects)
            .set({
                slug: data.slug,
                title_en: data.title_en,
                description_en: data.description_en,
                body_en: data.body_en,
                title_tr: data.title_tr,
                description_tr: data.description_tr,
                body_tr: data.body_tr,
                github_url: data.github_url || null,
                live_url: data.live_url || null,
                thumbnail_url: data.thumbnail_url || null,
                showOnHomepage: data.showOnHomepage,
                tags: data.tags,
            })
            .where(eq(projects.id, data.id));

        logger.info("Project updated", {
            slug: data.slug,
            user: session.user.email,
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

    // Revalidate all paths where this project might be shown
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
