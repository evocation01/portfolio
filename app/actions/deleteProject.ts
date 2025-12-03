"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import logger from "@/lib/logger";
import { projects } from "@/lib/schema";
import { del } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteProject(formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const id = formData.get("id");
    if (typeof id !== "string") {
        throw new Error("Invalid project ID");
    }

    const projectId = Number(id);
    if (isNaN(projectId)) {
        throw new Error("Invalid project ID");
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
            }
        }

        await db.delete(projects).where(eq(projects.id, projectId));

        logger.info("Project deleted successfully", {
            projectId,
            user: session.user.email,
        });
    } catch (error) {
        logger.error("Database Error: Failed to Delete Project", { error });
        throw new Error("Database Error: Failed to Delete Project.");
    }

    revalidatePath("/admin");
    revalidatePath("/projects");
}
