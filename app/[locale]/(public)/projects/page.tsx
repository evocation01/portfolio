// app/[locale]/(public)/projects/page.tsx
import { ProjectFilters } from "@/components/public/ProjectFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { db } from "@/lib/db";
import { projects, projectsToTags } from "@/lib/schema";
import { and, count, desc, ilike, or, inArray } from "drizzle-orm";
import type { Metadata, Viewport } from "next";
import { getIntlayer } from "next-intlayer";
import Image from "next/image";
import Link from "next/link";
import projectsContent from "./projects.content";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const awaitedParams = await params;
    const content = getIntlayer(projectsContent.key, awaitedParams.locale);
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const getLocalizedUrl = (locale: string) => {
        if (locale === "en") {
            return `${baseUrl}/projects`;
        }
        return `${baseUrl}/${locale}/projects`;
    };

    return {
        title: content.metaTitle.value,
        description: content.metaDescription.value,
        alternates: {
            canonical: getLocalizedUrl(awaitedParams.locale),
            languages: {
                en: getLocalizedUrl("en"),
                tr: getLocalizedUrl("tr"),
                "x-default": getLocalizedUrl("en"),
            },
        },
    };
}

export function generateViewport(): Viewport {
    return {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    };
}

const PROJECTS_PER_PAGE = 6;

export default async function ProjectsPage(props: {
    params: Promise<{ locale: string }>;
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const searchParams = props.searchParams;
    const params = await props.params;
    const locale = params.locale as "en" | "tr";
    const content = getIntlayer(projectsContent.key, locale);

    const page = Number(searchParams?.page || 1);
    const selectedTagName = (searchParams?.tag as string) || "";
    const query = (searchParams?.query as string) || "";
    const offset = (page - 1) * PROJECTS_PER_PAGE;

    // --- New Data Fetching and Filtering Logic ---

    // 1. Fetch all tags and build hierarchy in one go
    const allTags = await db.query.tags.findMany();
    const masterTags = allTags
        .filter((t) => t.isMasterTag)
        .map((master) => ({
            ...master,
            children: allTags.filter((child) => child.parentId === master.id),
        }));

    // 2. Determine tag IDs to filter by
    let tagIdsToFilter: number[] = [];
    if (selectedTagName) {
        const selectedTag = allTags.find(
            (t) => t.name.toLowerCase() === selectedTagName.toLowerCase()
        );
        if (selectedTag) {
            if (selectedTag.isMasterTag) {
                tagIdsToFilter = [
                    selectedTag.id,
                    ...masterTags
                        .find((mt) => mt.id === selectedTag.id)
                        ?.children.map((c) => c.id) ?? [],
                ];
            } else {
                tagIdsToFilter = [selectedTag.id];
            }
        }
    }

    // 3. Construct WHERE clauses
    const whereClauses = [];
    if (query) {
        const searchTerm = `%${query.trim()}%`;
        whereClauses.push(
            or(
                ilike(projects.title_en, searchTerm),
                ilike(projects.title_tr, searchTerm),
                ilike(projects.description_en, searchTerm),
                ilike(projects.description_tr, searchTerm)
            )!
        );
    }

    if (tagIdsToFilter.length > 0) {
        const projectIdsWithTag = await db
            .select({ projectId: projectsToTags.projectId })
            .from(projectsToTags)
            .where(inArray(projectsToTags.tagId, tagIdsToFilter));

        const ids = projectIdsWithTag.map((p) => p.projectId);

        if (ids.length === 0) {
            // If no projects match the tag, create an impossible condition
            whereClauses.push(inArray(projects.id, [-1]));
        } else {
            whereClauses.push(inArray(projects.id, ids));
        }
    }

    const where = whereClauses.length > 0 ? and(...whereClauses) : undefined;

    // 4. Fetch filtered projects and total count
    const [filteredProjects, total] = await Promise.all([
        db.query.projects.findMany({
            where,
            orderBy: [desc(projects.createdAt)],
            limit: PROJECTS_PER_PAGE,
            offset,
        }),
        db.select({ count: count() }).from(projects).where(where),
    ]);

    const totalPages = Math.ceil(total[0].count / PROJECTS_PER_PAGE);

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                    {content.pageTitle}
                </h1>
                <p className="mt-2 text-base sm:text-lg text-muted-foreground">
                    {content.pageDescription}
                </p>
            </div>

            <ProjectFilters
                masterTags={masterTags}
                searchPlaceholder={content.searchPlaceholder.value}
                allTagsLabel={content.allTags.value}
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[1vw] gap-y-[3vh]">
                {filteredProjects.map((project) => {
                    const title =
                        locale === "tr" ? project.title_tr : project.title_en;
                    const description =
                        locale === "tr"
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
                                <div className="p-6">
                                    <CardHeader className="p-0">
                                        <CardTitle>{title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0 pt-2">
                                        <p className="text-sm text-muted-foreground line-clamp-5">
                                            {description}
                                        </p>
                                    </CardContent>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
                {filteredProjects.length === 0 && (
                    <div className="md:col-span-3 text-center text-muted-foreground py-16 border-2 border-dashed rounded-lg bg-muted/50">
                        {content.noProjects}
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    previousPage={content.previousPage.value}
                    nextPage={content.nextPage.value}
                    pageIndicator={content.pageIndicator.value}
                />
            )}
        </div>
    );
}
