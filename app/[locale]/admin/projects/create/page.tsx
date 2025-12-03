// app/[locale]/admin/projects/create/page.tsx
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Button } from "@/components/ui/button";
import { createProject } from "@/lib/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateProjectPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">
                    Create New Project
                </h1>
            </div>

            <ProjectForm serverAction={createProject} />
        </div>
    );
}
