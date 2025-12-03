// app/[locale]/admin/page.tsx
import { ProjectsList } from "@/components/admin/ProjectsList";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <ProjectsList />
        </div>
    );
}
