// app/layout.tsx
import { Providers } from "@/components/layouts/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"; // New import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Portfolio",
    description: "Personal Portfolio Website",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>{children}</Providers>
                <Toaster richColors position="top-right" />
            </body>
        </html>
    );
}
