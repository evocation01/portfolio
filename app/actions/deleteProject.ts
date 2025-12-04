"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import logger from "@/lib/logger";
import { projects } from "@/lib/schema";
import { del } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"; // New import for redirect

// Define the expected state type that the action can return
type DeleteActionState = {
    message?: string;
    error?: string;
    success?: boolean;
};

export async function deleteProject(
    prevState: DeleteActionState | undefined, // Explicitly allow undefined
    formData: FormData
) {
    const session = await auth();
    if (!session?.user) {
        redirect("/api/auth/signin"); // Redirect unauthorized users
    }

    const id = formData.get("id");
    if (typeof id !== "string") {
        return { error: "Invalid project ID provided." }; // Return error message
    }

    const projectId = Number(id);
    if (isNaN(projectId)) {
        return { error: "Invalid project ID provided." }; // Return error message
    }

    try {
        const [project] = await db
            .select({ thumbnailUrl: projects.thumbnail_url })
            .from(projects)
            .where(eq(projects.id, projectId));

        if (project?.thumbnailUrl) {
            try {
                await del(project.thumbnailUrl);
                logger.info("Associated thumbnail deleted from Vercel Blob", {
                    url: project.thumbnailUrl,
                });
            } catch (blobError) {
                logger.error("Failed to delete thumbnail from Vercel Blob", {
                    url: project.thumbnailUrl,
                    error: blobError,
                });
                // Log the error but continue to delete DB record
            }
        }

        await db.delete(projects).where(eq(projects.id, projectId));

        logger.info("Project deleted successfully", {
            projectId,
            user: session.user.email,
        });

        revalidatePath("/admin"); // Revalidate paths
        revalidatePath("/projects");

        return { message: "Project deleted successfully.", success: true };
    } catch (error) {
        logger.error("Database Error: Failed to Delete Project", { error });
        return { error: "Database Error: Failed to delete project." };
    }
}
