// components/admin/TagsManager.tsx
"use client";
import { useActionState, useEffect, useState, useMemo } from "react";
import {
    createTag,
    updateTag,
    deleteTag,
    bulkUpdateTags,
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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit, Plus, Loader2, GitMerge } from "lucide-react";

type Tag = typeof tags.$inferSelect;

// --- Hooks ---
function useActionToast(state: { message?: string } | undefined, callback?: () => void) {
    useEffect(() => {
        if (state?.message) {
            toast(state.message);
            callback?.();
        }
    }, [state, callback]);
}

// --- Sub-components ---

function CreateTagForm() {
    const [state, formAction, isPending] = useActionState(createTag, undefined);
    useActionToast(state);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Tag(s)</CardTitle>
                <CardDescription>
                    Add one or more tags by separating them with commas. All created tags will share the same master status.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Tag Name(s)</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="e.g., React, Next.js, TypeScript"
                            required
                        />
                    </div>
                    <div className="flex items-end space-x-4">
                        <div className="flex items-center space-x-2 pt-2">
                            <Switch id="isMasterTag" name="isMasterTag" />
                            <Label htmlFor="isMasterTag">Master Tag?</Label>
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

function EditTagDialog({ tag, allTags, children }: { tag: Tag; allTags: Tag[], children: React.ReactNode }) {
    const [state, formAction, isPending] = useActionState(updateTag, undefined);
    useActionToast(state);
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit: {tag.name}</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="id" value={tag.id} />
                    <div className="space-y-2">
                        <Label htmlFor={`name-${tag.id}`}>Tag Name</Label>
                        <Input id={`name-${tag.id}`} name="name" defaultValue={tag.name} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`parentId-${tag.id}`}>Parent Tag</Label>
                        <Select name="parentId" defaultValue={String(tag.parentId ?? "null")}>
                            <SelectTrigger><SelectValue placeholder="Select a parent" /></SelectTrigger>
                            <SelectContent className="max-h-60">
                                <SelectItem value="null">None</SelectItem>
                                {allTags.filter(t => t.id !== tag.id).map((t) => (
                                    <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id={`isMasterTag-${tag.id}`} name="isMasterTag" defaultChecked={tag.isMasterTag} />
                        <Label htmlFor={`isMasterTag-${tag.id}`}>Is Master Tag?</Label>
                    </div>
                    <Button type="submit" disabled={isPending} className="w-full">
                        {isPending && <Loader2 className="mr-2 animate-spin" />}
                        Update Tag
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function DeleteTagButton({ tagId }: { tagId: number }) {
    const [state, formAction, isPending] = useActionState(deleteTag, undefined);
    useActionToast(state);
    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={tagId} />
            <Button variant="ghost" size="icon" type="submit" disabled={isPending} aria-label="Delete tag">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
            </Button>
        </form>
    );
}

function BulkEditDialog({ selectedTagIds, allTags, onClear }: { selectedTagIds: number[]; allTags: Tag[]; onClear: () => void; }) {
    const [state, formAction, isPending] = useActionState(bulkUpdateTags, undefined);
    useActionToast(state, () => {
        if (state?.success) {
            onClear();
            setOpen(false);
        }
    });
    const [open, setOpen] = useState(false);

    if (selectedTagIds.length === 0) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <GitMerge className="mr-2" />
                    Bulk Edit ({selectedTagIds.length})
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Bulk Edit Tags</DialogTitle>
                    <CardDescription>Apply changes to all selected tags.</CardDescription>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="tagIds" value={selectedTagIds.join(",")} />
                    <div className="space-y-2">
                        <Label htmlFor="newParentId">Set New Parent</Label>
                        <Select name="newParentId" defaultValue="">
                            <SelectTrigger><SelectValue placeholder="Keep Unchanged" /></SelectTrigger>
                            <SelectContent className="max-h-60">
                                <SelectItem value="">Keep Unchanged</SelectItem>
                                <SelectItem value="null">None (make top-level)</SelectItem>
                                {allTags.filter(t => !selectedTagIds.includes(t.id)).map((t) => (
                                    <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="isMasterTag">Master Tag Status</Label>
                        <Select name="isMasterTag" defaultValue="">
                            <SelectTrigger><SelectValue placeholder="Keep Unchanged" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">Keep Unchanged</SelectItem>
                                <SelectItem value="true">Set as Master</SelectItem>
                                <SelectItem value="false">Remove as Master</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" disabled={isPending} className="w-full">
                        {isPending && <Loader2 className="mr-2 animate-spin" />}
                        Apply Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function TagListItem({ tag, allTags, children, selectedTagIds, onSelectionChange }: { tag: Tag; allTags: Tag[]; children: React.ReactNode; selectedTagIds: number[]; onSelectionChange: (id: number, checked: boolean) => void; }) {
    return (
        <AccordionItem value={`tag-${tag.id}`} className="border-b-0">
            <div className="flex items-center justify-between rounded-md border p-2 hover:bg-muted/50">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id={`select-tag-${tag.id}`}
                        checked={selectedTagIds.includes(tag.id)}
                        onCheckedChange={(checked) => onSelectionChange(tag.id, !!checked)}
                    />
                    {tag.isMasterTag && <span className="text-xs font-bold text-primary">●</span>}
                    <span className="font-semibold">{tag.name}</span>
                </div>
                <div className="flex items-center">
                    {children && <AccordionTrigger />}
                    <EditTagDialog tag={tag} allTags={allTags}>
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    </EditTagDialog>
                    <DeleteTagButton tagId={tag.id} />
                </div>
            </div>
            {children && (
                <AccordionContent className="pl-6 pt-2 border-l-2 ml-4">
                    {children}
                </AccordionContent>
            )}
        </AccordionItem>
    );
}

// --- Main Component ---

export function TagsManager({ allTags }: { allTags: Tag[] }) {
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    const { tagTree, tagMap } = useMemo(() => {
        const tagMap = new Map(allTags.map((t) => [t.id, { ...t, children: [] as Tag[] }]));
        const rootTags: Tag[] = [];
        for (const tag of allTags) {
            if (tag.parentId) {
                tagMap.get(tag.parentId)?.children.push(tag);
            } else {
                rootTags.push(tag);
            }
        }
        return { tagTree: rootTags, tagMap };
    }, [allTags]);

    const handleSelectionChange = (id: number, checked: boolean) => {
        setSelectedTagIds(prev =>
            checked ? [...prev, id] : prev.filter(tagId => tagId !== id)
        );
    };

    const renderTree = (tags: Tag[]) => (
        <Accordion type="multiple" className="w-full space-y-2">
            {tags.map((tag) => (
                <TagListItem
                    key={tag.id}
                    tag={tag}
                    allTags={allTags}
                    selectedTagIds={selectedTagIds}
                    onSelectionChange={handleSelectionChange}
                >
                    {tagMap.get(tag.id)?.children.length > 0 && renderTree(tagMap.get(tag.id)!.children)}
                </TagListItem>
            ))}
        </Accordion>
    );

    return (
        <div className="space-y-8">
            <CreateTagForm />
            <Card>
                <CardHeader>
                    <CardTitle>Existing Tags</CardTitle>
                    <div className="flex items-center justify-between">
                         <p className="text-muted-foreground">Organize your tags into a hierarchy.</p>
                         <BulkEditDialog selectedTagIds={selectedTagIds} allTags={allTags} onClear={() => setSelectedTagIds([])} />
                    </div>
                </CardHeader>
                <CardContent>
                    {renderTree(tagTree)}
                </CardContent>
            </Card>
        </div>
    );
}
