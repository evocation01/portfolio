// lib/tags-actions.ts
"use server";

import { z } from "zod";
import { db } from "./db";
import { projectsToTags, tags } from "./schema";
import { auth } from "./auth";
import { revalidatePath } from "next/cache";
import { and, eq, isNull } from "drizzle-orm";

const TagSchema = z.object({
    name: z.string().min(1, "Name is required"),
    isMasterTag: z.coerce.boolean(),
    parentId: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : null)),
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
            message: "Failed to create tag.",
        };
    }

    const { name, isMasterTag, parentId } = validatedFields.data;

    try {
        await db.insert(tags).values({ name, isMasterTag, parentId });
        revalidatePath("/admin/tags");
        return { message: `Tag "${name}" created successfully.` };
    } catch (e) {
        return { message: "Failed to create tag. It may already exist." };
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
        return { message: `Tag "${name}" updated successfully.` };
    } catch (e) {
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
            await tx
                .delete(projectsToTags)
                .where(eq(projectsToTags.tagId, id));

            // 3. Delete the tag itself
            await tx.delete(tags).where(eq(tags.id, id));
        });

        revalidatePath("/admin/tags");
        return { message: "Tag deleted successfully." };
    } catch (e) {
        return { message: "Failed to delete tag." };
    }
}
