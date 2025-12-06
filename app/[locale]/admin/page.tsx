// app/[locale]/admin/page.tsx
import { ProjectsList } from "@/components/admin/ProjectsList";
import { getIntlayer } from "next-intlayer";
import adminContent from "./admin.content";

export default async function DashboardPage(
    props: {
        params: Promise<{ locale: string }>;
    }
) {
    const params = await props.params;
    const content = getIntlayer(adminContent.key, params.locale);

    return (
        <div className="space-y-8">
            <ProjectsList content={content} />
        </div>
    );
}
