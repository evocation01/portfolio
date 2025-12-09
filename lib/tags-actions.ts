// lib/tags-actions.ts
"use server";

import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "./auth";
import { db } from "./db";
import { projectsToTags, tags } from "./schema";

const TagSchema = z.object({
    name: z.string().min(1, "Name is required"),
    isMasterTag: z.coerce.boolean().default(false),
    parentId: z
        .string()
        .optional()
        .transform((val) => (val && val !== "null" ? Number(val) : null)),
});

export async function createTag(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user) return { message: "Unauthorized" };

    const validatedFields = TagSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Failed to create tag(s).",
        };
    }

    const { name, isMasterTag, parentId } = validatedFields.data;

    const tagNames = name
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean);

    if (tagNames.length === 0) {
        return { message: "No tag names provided." };
    }

    const newTags = tagNames.map((n) => ({
        name: n,
        isMasterTag,
        parentId,
    }));

    try {
        await db.insert(tags).values(newTags);
        revalidatePath("/admin/tags");
        return { message: `Successfully created ${newTags.length} tag(s).`, success: true };
    } catch (e) {
        return { message: "Failed to create tags. Some may already exist.", success: false };
    }
}

const UpdateTagSchema = TagSchema.extend({
    id: z.coerce.number(),
});

export async function updateTag(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user) return { message: "Unauthorized" };

    const validatedFields = UpdateTagSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Failed to update tag.",
        };
    }

    const { id, name, isMasterTag, parentId } = validatedFields.data;

    // Prevent a tag from being its own parent
    if (id === parentId) {
        return { message: "A tag cannot be its own parent." };
    }

    try {
        await db
            .update(tags)
            .set({ name, isMasterTag, parentId })
            .where(eq(tags.id, id));
        revalidatePath("/admin/tags");
        return { message: `Tag "${name}" updated successfully.`, success: true };
    } catch (e) {
        console.error("Database update failed:", e);
        return { message: "Failed to update tag." };
    }
}

const DeleteTagSchema = z.object({
    id: z.coerce.number(),
});

export async function deleteTag(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user) return { message: "Unauthorized" };

    const validatedFields = DeleteTagSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return { message: "Invalid tag ID." };
    }

    const { id } = validatedFields.data;

    try {
        await db.transaction(async (tx) => {
            // 1. Set parentId to null for all children of the tag being deleted
            await tx
                .update(tags)
                .set({ parentId: null })
                .where(eq(tags.parentId, id));

            // 2. Delete all associations of this tag from projects
            await tx.delete(projectsToTags).where(eq(projectsToTags.tagId, id));

            // 3. Delete the tag itself
            await tx.delete(tags).where(eq(tags.id, id));
        });

        revalidatePath("/admin/tags");
        return { message: "Tag deleted successfully." };
    } catch (e) {
        return { message: "Failed to delete tag." };
    }
}

const BulkUpdateSchema = z.object({
    tagIds: z.string().transform((str) => str.split(",").map(Number)),
    newParentId: z
        .string()
        .transform((val) => (val === "null" ? null : Number(val))),
    isMasterTag: z.string().optional(),
});

export async function bulkUpdateTags(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user) return { message: "Unauthorized", success: false };

    const validatedFields = BulkUpdateSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return { message: "Invalid data provided for bulk update.", success: false };
    }

    const { tagIds, newParentId, isMasterTag } = validatedFields.data;

    if (newParentId !== null && tagIds.includes(newParentId)) {
        return { message: "Cannot set a tag as its own child.", success: false };
    }

    const valuesToSet: { parentId?: number | null; isMasterTag?: boolean } = {};

    if (formData.has("newParentId")) {
        valuesToSet.parentId = newParentId;
    }

    if (isMasterTag === "true") {
        valuesToSet.isMasterTag = true;
    } else if (isMasterTag === "false") {
        valuesToSet.isMasterTag = false;
    }

    if (Object.keys(valuesToSet).length === 0) {
        return { message: "No changes were specified.", success: false };
    }

    try {
        await db
            .update(tags)
            .set(valuesToSet)
            .where(inArray(tags.id, tagIds));

        revalidatePath("/admin/tags");
        return {
            message: `Successfully updated ${tagIds.length} tag(s).`,
            success: true,
        };
    } catch (e) {
        return { message: "Failed to bulk update tags.", success: false };
    }
}
