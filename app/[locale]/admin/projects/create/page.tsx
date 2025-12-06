// app/[locale]/admin/projects/create/page.tsx
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Button } from "@/components/ui/button";
import { createProject } from "@/lib/actions";
import { getIntlayer } from "next-intlayer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import adminContent from "../../admin.content";

export default async function CreateProjectPage(
    props: {
        params: Promise<{ locale: string }>;
    }
) {
    const params = await props.params;
    const content = getIntlayer(adminContent.key, params.locale);
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">
                    {content.createProjectTitle}
                </h1>
            </div>

            <ProjectForm serverAction={createProject} content={content} />
        </div>
    );
}
