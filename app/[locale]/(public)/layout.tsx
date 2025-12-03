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
            <main className="container mx-auto py-8 px-4 min-h-screen">
                <PageTransition>{children}</PageTransition>
            </main>
        </>
    );
}
