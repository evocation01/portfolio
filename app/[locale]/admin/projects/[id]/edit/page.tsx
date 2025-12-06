// app/[locale]/admin/projects/[id]/edit/page.tsx
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Skeleton } from "@/components/ui/skeleton";
import { updateProject } from "@/lib/actions";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getIntlayer } from "next-intlayer";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import adminContent from "../../../admin.content";

async function EditFormLoader({
    projectId,
    content,
}: {
    projectId: number;
    content: any;
}) {
    const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, projectId));

    if (!project) {
        notFound();
    }

    return (
        <ProjectForm
            project={project}
            serverAction={updateProject}
            content={content}
        />
    );
}

function EditFormSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-8 w-96" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-24 w-full" />
            </div>
            <div className="flex justify-end">
                <Skeleton className="h-10 w-24" />
            </div>
        </div>
    );
}

export default async function EditProjectPage(props: {
    params: Promise<{ id: string; locale: string }>;
}) {
    const params = (await props.params);
    const content = getIntlayer(adminContent.key, params.locale);

    const projectId = Number(params.id);
    // Basic validation, the loader will handle the notFound case
    if (isNaN(projectId)) {
        notFound();
    }

    return (
        <div>
            <Suspense fallback={<EditFormSkeleton />}>
                <EditFormLoader projectId={projectId} content={content} />
            </Suspense>
        </div>
    );
}
