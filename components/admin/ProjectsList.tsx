import { type ReactNode } from "react";
// components/admin/ProjectsList.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { Edit, ExternalLink, Github, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DeleteProjectButton } from "./DeleteProjectButton";

import { type AdminContentType } from "@/app/[locale]/admin/admin.content";

export async function ProjectsList({ content }: { content: AdminContentType }) {
    const allProjects = await db
        .select()
        .from(projects)
        .orderBy(desc(projects.createdAt));

    return (
        <>
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                    {content.existingProjects as unknown as ReactNode} (
                    {allProjects.length})
                </h3>
                <Button asChild>
                    <Link
                        href="/admin/projects/create"
                        className="flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />{" "}
                        {content.addNewProject as unknown as ReactNode}
                    </Link>
                </Button>
            </div>

            {allProjects.length === 0 ? (
                <div className="mt-8 col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/50">
                    <p>{content.noProjectsFound as unknown as ReactNode}</p>
                    <Button variant="link" asChild>
                        <Link href="/admin/projects/create">
                            {content.createFirstProject as unknown as ReactNode}
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    {allProjects.map((project) => (
                        <Card
                            key={project.id}
                            className="flex flex-col h-full overflow-hidden"
                        >
                            {project.thumbnail_url && (
                                <div className="relative w-full aspect-video">
                                    <Image
                                        src={project.thumbnail_url}
                                        alt={project.title_en}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col flex-1 p-4">
                                <CardHeader className="p-0 pb-2">
                                    <CardTitle className="flex justify-between items-start text-base">
                                        <span className="truncate pr-2">
                                            {project.title_en}
                                        </span>
                                        <span className="text-[10px] font-mono bg-muted text-muted-foreground px-1.5 py-0.5 rounded border">
                                            {project.slug}
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 flex-1 flex flex-col gap-4">
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {project.description_en}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t">
                                        <div className="flex gap-2 text-muted-foreground">
                                            {project.github_url && (
                                                <a
                                                    key={`github-${project.id}`}
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-muted-foreground hover:text-foreground"
                                                >
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            )}
                                            {project.live_url && (
                                                <a
                                                    key={`live-${project.id}`}
                                                    href={project.live_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-muted-foreground hover:text-foreground"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                                className="h-8"
                                            >
                                                <Link
                                                    href={`/admin/projects/${project.id}/edit`}
                                                >
                                                    <Edit className="h-3 w-3 mr-1" />{" "}
                                                    {
                                                        content.editButton as unknown as ReactNode
                                                    }
                                                </Link>
                                            </Button>
                                            <DeleteProjectButton
                                                projectId={project.id}
                                                deleteButtonText={
                                                    content.deleteButton as unknown as string
                                                }
                                                deletingButtonText={
                                                    content.deletingButton as unknown as string
                                                }
                                                deleteConfirmationText={
                                                    content.deleteConfirmation as unknown as string
                                                }
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}
