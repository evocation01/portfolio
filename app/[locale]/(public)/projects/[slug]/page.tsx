// app/[locale]/(public)/projects/[slug]/page.tsx
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { ExternalLink, Github } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata, Viewport } from "next";
import config from "@/intlayer.config";

export async function generateStaticParams() {
    const allProjects = await db.select({ slug: projects.slug }).from(projects);
    const locales = config.internationalization?.locales ?? [];

    const params = allProjects.flatMap((project) =>
        locales.map((locale) => ({
            slug: project.slug,
            locale,
        }))
    );

    return params;
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string; locale: string }> }
): Promise<Metadata> {
    const awaitedParams = await params;
    const project = await db.query.projects.findFirst({
        where: eq(projects.slug, awaitedParams.slug),
    });

    if (!project) {
        return {
            title: "Project Not Found",
            description: "The requested project could not be found.",
        };
    }

    const title = awaitedParams.locale === "tr" ? project.title_tr : project.title_en;
    const description =
        awaitedParams.locale === "tr"
            ? project.description_tr
            : project.description_en;

    const ogImageUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og`);
    ogImageUrl.searchParams.set("title", title);
    ogImageUrl.searchParams.set("description", description);

    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const getLocalizedUrl = (locale: string) => {
        if (locale === "en") {
            return `${baseUrl}/projects/${awaitedParams.slug}`;
        }
        return `${baseUrl}/${locale}/projects/${awaitedParams.slug}`;
    };

    return {
        title,
        description,
        alternates: {
            canonical: getLocalizedUrl(awaitedParams.locale),
            languages: {
                en: getLocalizedUrl("en"),
                tr: getLocalizedUrl("tr"),
                "x-default": getLocalizedUrl("en"),
            },
        },
        openGraph: {
            title,
            description,
            images: [
                {
                    url: ogImageUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
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

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string; locale: string }> }) {
    const params = await props.params;
    const awaitedParams = await params;
    const project = await db.query.projects.findFirst({
        where: eq(projects.slug, awaitedParams.slug),
        with: {
            projectsToTags: {
                with: {
                    tag: true,
                },
            },
        },
    });

    if (!project) {
        notFound();
    }

    const title = params.locale === "tr" ? project.title_tr : project.title_en;
    const description =
        params.locale === "tr"
            ? project.description_tr
            : project.description_en;
    const body = params.locale === "tr" ? project.body_tr : project.body_en;

    return (
        <article className="max-w-4xl mx-auto py-10 px-4">
            <header className="mb-8 border-b pb-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
                    {title}
                </h1>
                <p className="text-xl text-muted-foreground">{description}</p>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-2">
                        {project.projectsToTags.map((item) => (
                            <Badge key={item.tag.id} variant="secondary">
                                {item.tag.name}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                        )}
                        {project.live_url && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <ExternalLink className="h-5 w-5" />
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {body}
                </ReactMarkdown>
            </div>
        </article>
    );
}
