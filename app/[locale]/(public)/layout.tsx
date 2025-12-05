// app/[locale]/(public)/layout.tsx
import { Header } from "@/components/layouts/Header";
import { PageTransition } from "@/components/layouts/PageTransition";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="mx-auto py-2 px-2 min-h-screen">
                <PageTransition>{children}</PageTransition>
            </main>
        </>
    );
}
