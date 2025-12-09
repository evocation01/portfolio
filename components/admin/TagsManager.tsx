// components/admin/TagsManager.tsx
"use client";
import { useActionState, useEffect, useState } from "react";
import {
    createTag,
    updateTag,
    deleteTag,
} from "@/lib/tags-actions";
import { type tags } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Trash2, Edit, Plus, Loader2 } from "lucide-react";

type Tag = typeof tags.$inferSelect;

function useActionToast(state: { message?: string } | undefined) {
    useEffect(() => {
        if (state?.message) {
            toast(state.message);
        }
    }, [state]);
}

// --- Sub-components ---

function CreateTagForm() {
    const [state, formAction, isPending] = useActionState(createTag, undefined);
    useActionToast(state);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Tag</CardTitle>
                <CardDescription>
                    Add a new tag to the system. Mark it as a master tag to show it
                    on the main filter bar.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Tag Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="e.g., React"
                            required
                        />
                    </div>
                    <div className="flex items-end space-x-4">
                        <div className="space-y-2 flex-grow">
                            <Label htmlFor="isMasterTag">Master Tag?</Label>
                            <Switch id="isMasterTag" name="isMasterTag" />
                        </div>
                        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                            {isPending ? <Loader2 className="animate-spin" /> : <Plus />}
                            <span className="ml-2">Create</span>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

function EditTagForm({ tag, allTags }: { tag: Tag; allTags: Tag[] }) {
    const [state, formAction, isPending] = useActionState(updateTag, undefined);
    useActionToast(state);

    return (
        <form action={formAction} className="space-y-4">
            <input type="hidden" name="id" value={tag.id} />
            <div className="space-y-2">
                <Label htmlFor={`name-${tag.id}`}>Tag Name</Label>
                <Input
                    id={`name-${tag.id}`}
                    name="name"
                    defaultValue={tag.name}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor={`parentId-${tag.id}`}>Parent Tag</Label>
                <Select name="parentId" defaultValue={String(tag.parentId)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a parent" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="null">None</SelectItem>
                        {allTags
                            .filter((t) => t.id !== tag.id) // Can't be its own parent
                            .map((t) => (
                                <SelectItem key={t.id} value={String(t.id)}>
                                    {t.name}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id={`isMasterTag-${tag.id}`}
                    name="isMasterTag"
                    defaultChecked={tag.isMasterTag}
                />
                <Label htmlFor={`isMasterTag-${tag.id}`}>Is Master Tag?</Label>
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
                {isPending && <Loader2 className="mr-2 animate-spin" />}
                Update Tag
            </Button>
        </form>
    );
}

function DeleteTagButton({ tagId }: { tagId: number }) {
    const [state, formAction, isPending] = useActionState(deleteTag, undefined);
    useActionToast(state);
    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={tagId} />
            <Button
                variant="ghost"
                size="icon"
                type="submit"
                disabled={isPending}
                aria-label="Delete tag"
            >
                {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Trash2 className="h-4 w-4 text-destructive" />
                )}
            </Button>
        </form>
    );
}


// --- Main Component ---

export function TagsManager({ allTags }: { allTags: Tag[] }) {
    const [openDialogs, setOpenDialogs] = useState<Record<number, boolean>>({});
    const tagMap = new Map(allTags.map((t) => [t.id, t.name]));

    return (
        <div className="space-y-8">
            <CreateTagForm />

            <Card>
                <CardHeader>
                    <CardTitle>Existing Tags</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {allTags.map((tag) => (
                            <div
                                key={tag.id}
                                className="flex items-center justify-between rounded-md border p-2"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
                                    <span className="font-semibold">{tag.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {tag.parentId
                                            ? `Child of: ${tagMap.get(tag.parentId)}`
                                            : "No Parent"}
                                    </span>
                                    {tag.isMasterTag && (
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                            Master
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <Dialog
                                        open={openDialogs[tag.id] || false}
                                        onOpenChange={(isOpen) =>
                                            setOpenDialogs((prev) => ({
                                                ...prev,
                                                [tag.id]: isOpen,
                                            }))
                                        }
                                    >
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit: {tag.name}</DialogTitle>
                                            </DialogHeader>
                                            <EditTagForm tag={tag} allTags={allTags} />
                                        </DialogContent>
                                    </Dialog>
                                    <DeleteTagButton tagId={tag.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
