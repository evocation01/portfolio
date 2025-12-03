// app/[locale]/(public)/page.tsx
import { Suspense } from "react";
import { LocalizedLink } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { ProjectsGrid } from "@/components/public/ProjectsGrid";
import { Skeleton } from "@/components/ui/skeleton";

function ProjectsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
        </div>
    );
}

export default function HomePage({ params }: { params: { locale: string } }) {
    return (
        <section className="flex flex-col gap-8 py-10 md:py-20 items-center text-center">
            <div className="max-w-2xl space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Hi, I'm Hakan 👋
                </h1>
                <p className="text-xl text-muted-foreground">
                    A Full-Stack Developer passionate about building robust web
                    applications with modern technologies.
                </p>
                <div className="flex gap-4 justify-center">
                    <Suspense
                        fallback={
                            <div className="h-12 w-36 rounded-md bg-muted animate-pulse" />
                        }
                    >
                        <Button asChild size="lg">
                            <LocalizedLink href="/projects">
                                View My Work
                            </LocalizedLink>
                        </Button>
                    </Suspense>
                    <Suspense
                        fallback={
                            <div className="h-12 w-36 rounded-md bg-muted animate-pulse" />
                        }
                    >
                        <Button variant="outline" size="lg" asChild>
                            <LocalizedLink href="/contact">
                                Contact Me
                            </LocalizedLink>
                        </Button>
                    </Suspense>
                </div>
            </div>

            <Suspense fallback={<ProjectsGridSkeleton />}>
                <ProjectsGrid />
            </Suspense>
        </section>
    );
}
