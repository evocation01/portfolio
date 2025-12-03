// app/[locale]/(public)/projects/[slug]/page.tsx
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

// This page needs to determine the locale to show the correct content.
// It gets the locale from the `params` object provided by Next.js.

export default async function ProjectDetailPage(
    props: {
        params: Promise<{ slug: string; locale: string }>;
    }
) {
    const params = await props.params;
    const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.slug, params.slug));

    if (!project) {
        notFound();
    }

    const title =
        params.locale === "tr" ? project.title_tr : project.title_en;
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
                        {project.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
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
                <ReactMarkdown>{body}</ReactMarkdown>
            </div>
        </article>
    );
}