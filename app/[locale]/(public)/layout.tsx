// app/[locale]/(public)/layout.tsx
import { Header } from "@/components/layouts/Header";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="container mx-auto py-8 px-4 min-h-screen">
                {children}
            </main>
        </>
    );
}
