"use server";

import { put, del } from "@vercel/blob";
import { auth } from "@/lib/auth";
import logger from "./logger";

export async function uploadImage(formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    const file = formData.get("file") as File;
    if (!file || file.size === 0) {
        return { error: "No file selected" };
    }

    // Basic validation for image type
    if (!file.type.startsWith("image/")) {
        return { error: "Invalid file type. Please upload an image." };
    }

    try {
        const blob = await put(file.name, file, {
            access: "public",
        });

        logger.info("Image uploaded successfully", { url: blob.url });
        return { url: blob.url };
    } catch (error) {
        logger.error("Failed to upload image", {
            message: error instanceof Error ? error.message : "Unknown error",
        });
        return { error: "Failed to upload image." };
    }
}

export async function deleteImage(url: string) {
    const session = await auth();
    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    try {
        await del(url);
        logger.info("Image deleted successfully", { url });
        return { success: true };
    } catch (error) {
        logger.error("Failed to delete image", {
            message: error instanceof Error ? error.message : "Unknown error",
        });
        return { error: "Failed to delete image." };
    }
}
