// app/[locale]/admin/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-36" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-56 w-full" />
                ))}
            </div>
        </div>
    );
}
