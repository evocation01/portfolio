// components/public/ProjectsGrid.tsx
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { ProjectCard } from "./ProjectCard";

export async function ProjectsGrid() {
    // Fetch top 3 projects for the homepage
    const latestProjects = await db
        .select()
        .from(projects)
        .where(eq(projects.showOnHomepage, true))
        .orderBy(desc(projects.createdAt))
        .limit(3);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
            {latestProjects.map((project) => (
                <ProjectCard project={project} key={project.id} />
            ))}
            {latestProjects.length === 0 && (
                <div className="md:col-span-3 text-center text-muted-foreground">
                    No projects found yet.
                </div>
            )}
        </div>
    );
}
