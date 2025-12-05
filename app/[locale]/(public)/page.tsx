// app/[locale]/(public)/page.tsx
import { LocalizedLink } from "@/components/LocalizedLink";
import { ProjectsGrid } from "@/components/public/ProjectsGrid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { getIntlayer } from "next-intlayer";
import Image from "next/image";
import { Suspense } from "react";
import homepageContent from "./homepage.content";

function ProjectsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mt-12">
            <Skeleton className="h-56 w-full" />
            <Skeleton className="h-56 w-full" />
            <Skeleton className="h-56 w-full" />
        </div>
    );
}

export default async function HomePage(props: {
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;
    const content = getIntlayer(homepageContent.key, params.locale);

    return (
        <>
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-[2vw]">
                        <div className="w-32 h-32 rounded-full p-1 border-2 border-primary">
                            <Image
                                src="/assets/headshot.jpg"
                                alt="Hakan Ispir"
                                width={128}
                                height={128}
                                className="rounded-full object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold">{content.welcome}</h1>
                    <p className="max-w-2xl text-lg text-muted-foreground mx-auto">
                        {content.description}
                    </p>
                    <div className="flex gap-4 justify-center pt-[2vw]">
                        <Button asChild size="lg">
                            <a href="#projects">{content.viewWork}</a>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <LocalizedLink href="/contact">
                                {content.contactMe}
                            </LocalizedLink>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section
                id="projects"
                className="py-16 bg-card text-card-foreground"
            >
                <div className="mx-auto py-2 px-2">
                    <div className="flex justify-center items-center mb-12 relative max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center">
                            {content.featuredProjects}
                        </h2>
                        <Button
                            asChild
                            variant="link"
                            className="absolute right-0"
                        >
                            <LocalizedLink href="/projects">
                                More Projects
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </LocalizedLink>
                        </Button>
                    </div>
                    <Suspense fallback={<ProjectsGridSkeleton />}>
                        <div className="max-w-7xl mx-auto">
                            <ProjectsGrid />
                        </div>
                    </Suspense>
                </div>
            </section>
        </>
    );
}
