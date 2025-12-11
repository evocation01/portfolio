import { type ReactNode } from "react";
// components/admin/ProjectForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deleteImage, uploadImage } from "@/lib/upload-actions";
import { type projects } from "@/lib/schema";
import { Loader2, Save, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useActionState, useState, useTransition, useEffect } from "react";
import { MarkdownEditor } from "./MarkdownEditor";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { type AdminContentType } from "@/app/[locale]/admin/admin.content";

type Project = typeof projects.$inferSelect;

type ProjectServerAction = (
    prevState: { message?: string; errors?: Record<string, string[]> },
    formData: FormData
) => Promise<{ message?: string; errors?: Record<string, string[]> }>;

interface ProjectFormProps {
    project?: Project;
    initialTags?: string;
    serverAction: ProjectServerAction;
    content: AdminContentType;
}

export function ProjectForm({
    project,
    initialTags = "",
    serverAction,
    content,
}: ProjectFormProps) {
    const [isPending, startTransition] = useTransition();
    const [uploading, setUploading] = useState(false);
    const isEditMode = !!project;

    const [formData, setFormData] = useState({
        slug: project?.slug ?? "",
        title_en: project?.title_en ?? "",
        description_en: project?.description_en ?? "",
        body_en: project?.body_en ?? "",
        title_tr: project?.title_tr ?? "",
        description_tr: project?.description_tr ?? "",
        body_tr: project?.body_tr ?? "",
        tags: initialTags,
        github_url: project?.github_url ?? "",
        live_url: project?.live_url ?? "",
        thumbnail_url: project?.thumbnail_url ?? "",
        showOnHomepage: project?.showOnHomepage ?? false,
    });

    const [state, formAction] = useActionState(serverAction, {
        message: "",
        errors: {},
    });

    useEffect(() => {
        if (state.message) {
            toast(state.message);
        }
        if (state.errors && Object.keys(state.errors).length > 0) {
            toast.error("Please check the form for errors.");
        }
    }, [state]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadImage(formData);
        if (result.error) {
            toast.error(`Upload failed: ${result.error}`);
        } else if (result.url) {
            setFormData((prev) => ({ ...prev, thumbnail_url: result.url }));
        }
        setUploading(false);
    };

    const handleRemoveImage = async () => {
        if (!formData.thumbnail_url) return;
        const result = await deleteImage(formData.thumbnail_url);
        if (result.error) {
            toast.error(`Failed to delete image: ${result.error}`);
        } else {
            setFormData((prev) => ({ ...prev, thumbnail_url: "" }));
        }
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, showOnHomepage: checked }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (typeof value === "boolean") {
                formDataObj.append(key, String(value));
            } else {
                formDataObj.append(key, value || "");
            }
        });
        if (isEditMode) {
            formDataObj.append("id", String(project.id));
        }
        startTransition(() => {
            formAction(formDataObj);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>
                        {isEditMode
                            ? (content.editProjectTitle as unknown as ReactNode)
                            : (content.createProjectTitle as unknown as ReactNode)}
                    </CardTitle>
                    <CardDescription>
                        {isEditMode
                            ? (content.editProjectDescription as unknown as ReactNode)
                            : (content.createProjectDescription as unknown as ReactNode)}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>{content.thumbnailLabel as unknown as ReactNode}</Label>
                        <div className="flex items-center gap-4">
                            {formData.thumbnail_url && (
                                <div key="thumb-preview" className="relative group">
                                    <Image
                                        src={formData.thumbnail_url}
                                        alt={content.thumbnailAlt as unknown as string}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-cover w-20 h-20"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={handleRemoveImage}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                            <div key="thumb-input" className="relative">
                                <Input
                                    id="thumbnail"
                                    type="file"
                                    onChange={handleFileChange}
                                    disabled={uploading}
                                    className="pl-12"
                                />
                                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                                    {uploading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <UploadCloud className="h-5 w-5" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-4">
                        <Switch
                            id="showOnHomepage"
                            name="showOnHomepage"
                            checked={formData.showOnHomepage}
                            onCheckedChange={handleSwitchChange}
                        />
                        <Label htmlFor="showOnHomepage">
                            {content.showOnHomepageLabel as unknown as ReactNode}
                        </Label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="slug">{content.slugLabel as unknown as ReactNode}</Label>
                            <Input
                                id="slug"
                                name="slug"
                                placeholder={content.slugPlaceholder as unknown as string}
                                value={formData.slug}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags">{content.tagsLabel as unknown as ReactNode}</Label>
                            <Input
                                id="tags"
                                name="tags"
                                placeholder={content.tagsPlaceholder as unknown as string}
                                value={formData.tags}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="github_url">{content.githubUrlLabel as unknown as ReactNode}</Label>
                            <Input
                                id="github_url"
                                name="github_url"
                                placeholder={content.githubUrlPlaceholder as unknown as string}
                                value={formData.github_url}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="live_url">{content.liveUrlLabel as unknown as ReactNode}</Label>
                            <Input
                                id="live_url"
                                name="live_url"
                                placeholder={content.liveUrlPlaceholder as unknown as string}
                                value={formData.live_url}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <Tabs defaultValue="en" className="w-full mt-6">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="en">{content.englishTab as unknown as ReactNode}</TabsTrigger>
                            <TabsTrigger value="tr">{content.turkishTab as unknown as ReactNode}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="en" className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="title_en">{content.titleEnLabel as unknown as ReactNode}</Label>
                                <Input
                                    id="title_en"
                                    name="title_en"
                                    placeholder={content.titleEnPlaceholder as unknown as string}
                                    value={formData.title_en}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description_en">
                                    {content.descriptionEnLabel as unknown as ReactNode}
                                </Label>
                                <Textarea
                                    id="description_en"
                                    name="description_en"
                                    placeholder={content.descriptionPlaceholder as unknown as string}
                                    value={formData.description_en}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="body_en">{content.bodyEnLabel as unknown as ReactNode}</Label>
                                <MarkdownEditor
                                    id="body_en"
                                    name="body_en"
                                    value={formData.body_en}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="tr" className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="title_tr">{content.titleTrLabel as unknown as ReactNode}</Label>
                                <Input
                                    id="title_tr"
                                    name="title_tr"
                                    placeholder={content.titleEnPlaceholder as unknown as string}
                                    value={formData.title_tr}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description_tr">
                                    {content.descriptionTrLabel as unknown as ReactNode}
                                </Label>
                                <Textarea
                                    id="description_tr"
                                    name="description_tr"
                                    placeholder={content.descriptionPlaceholder as unknown as string}
                                    value={formData.description_tr}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="body_tr">{content.bodyTrLabel as unknown as ReactNode}</Label>
                                <MarkdownEditor
                                    id="body_tr"
                                    name="body_tr"
                                    value={formData.body_tr}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => history.back()}
                    >
                        {content.cancelButton as unknown as ReactNode}
                    </Button>
                    <Button type="submit" disabled={isPending || uploading}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {content.savingButton as unknown as ReactNode}
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                {isEditMode ? (content.updateButton as unknown as ReactNode) : (content.createButton as unknown as ReactNode)}
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
