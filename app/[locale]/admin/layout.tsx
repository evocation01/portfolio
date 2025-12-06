import { Header } from "@/components/layouts/Header";
import { auth } from "@/lib/auth";
import { getIntlayer } from "next-intlayer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import adminContent from "./admin.content";

export default async function AdminLayout(
    props: {
        children: React.ReactNode;
        params: Promise<{ locale: string }>;
    }
) {
    const params = await props.params;

    const {
        children
    } = props;

    // By reading a cookie, we explicitly opt this entire layout
    // and its children into dynamic rendering. This is the simplest
    // way to resolve the persistent cache-related errors.
    await cookies();

    const session = await auth();
    const content = getIntlayer(adminContent.key, params.locale);

    // Guard: Redirect to login if no session exists
    if (!session) {
        redirect("/api/auth/signin"); // Or your custom /login page
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto py-10 px-4">
                <div className="flex flex-col gap-4 mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {content.dashboardTitle}
                    </h2>
                    <p className="text-muted-foreground">
                        {content.dashboardDescription}
                    </p>
                </div>
                <main>{children}</main>
            </div>
        </div>
    );
}
