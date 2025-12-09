// app/[locale]/admin/tags/page.tsx
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TagsManager } from "@/components/admin/TagsManager";
import { db } from "@/lib/db";

async function TagsLoader() {
    const allTags = await db.query.tags.findMany({
        orderBy: (tags, { asc }) => [asc(tags.name)],
    });

    return <TagsManager allTags={allTags} />;
}

function TagsSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    );
}

export default function TagsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold tracking-tight mb-6">
                Manage Tags
            </h1>
            <Suspense fallback={<TagsSkeleton />}>
                <TagsLoader />
            </Suspense>
        </div>
    );
}
