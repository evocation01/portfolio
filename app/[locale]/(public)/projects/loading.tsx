// app/[locale]/(public)/projects/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="space-y-2 mb-8">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-6 w-96" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-56 w-full" />
                ))}
            </div>
        </div>
    );
}
