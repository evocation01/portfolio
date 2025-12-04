// app/[locale]/(public)/projects/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { count, desc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

const PROJECTS_PER_PAGE = 6;

export default async function ProjectsPage({
    params,
    searchParams,
}: {
    params: { locale: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const page = Number(searchParams?.page || 1);
    const offset = (page - 1) * PROJECTS_PER_PAGE;

    const [allProjects, total] = await Promise.all([
        db
            .select()
            .from(projects)
            .orderBy(desc(projects.createdAt))
            .limit(PROJECTS_PER_PAGE)
            .offset(offset),
        db.select({ count: count() }).from(projects),
    ]);

    const totalPages = Math.ceil(total[0].count / PROJECTS_PER_PAGE);

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    My Work
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    A collection of my projects.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.map((project) => {
                    const title =
                        params.locale === "tr"
                            ? project.title_tr
                            : project.title_en;
                    const description =
                        params.locale === "tr"
                            ? project.description_tr
                            : project.description_en;

                    return (
                        <Link
                            href={`/projects/${project.slug}`}
                            key={project.id}
                            className="block"
                        >
                            <Card className="text-left h-full hover:border-primary transition-colors overflow-hidden">
                                {project.thumbnail_url && (
                                    <div className="relative w-full aspect-video">
                                        <Image
                                            src={project.thumbnail_url}
                                            alt={title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-4">
                                    <CardHeader className="p-0">
                                        <CardTitle>{title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0 pt-2">
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {description}
                                        </p>
                                    </CardContent>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
                {allProjects.length === 0 && (
                    <div className="md:col-span-3 text-center text-muted-foreground py-16 border-2 border-dashed rounded-lg bg-muted/50">
                        No projects have been added yet.
                    </div>
                )}
            </div>
            {totalPages > 1 && (
                <Pagination currentPage={page} totalPages={totalPages} />
            )}
        </div>
    );
}
