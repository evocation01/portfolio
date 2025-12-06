// app/[locale]/layout.tsx
import { RootLayoutClient } from "@/components/layouts/RootLayoutClient";
import type { Locale } from "intlayer";
import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// METADATA
export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    ),
    title: {
        template: "%s | Hakan İspir",
        absolute: "Hakan İspir | Full-Stack Developer & AI Engineer", // Added for Next.js Metadata API requirement
    },
    // The rest of the metadata is now handled at the page level
    // or through default Next.js behavior.
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1, // Changed from 5 for better consistency as requested in page-level viewports
    userScalable: true,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const awaitedParams = await params;
    const locale = awaitedParams.locale as Locale;
    console.log("[LocaleLayout] Extracted locale:", locale);

    return (
        <html
            lang={locale}
            className={inter.className}
            suppressHydrationWarning
        >
            <head>
                <meta name="application-name" content="Hakan İspir Portfolio" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
            </head>
            <body>
                <SessionProvider>
                    <IntlayerClientProvider locale={locale}>
                        <RootLayoutClient>{children}</RootLayoutClient>
                    </IntlayerClientProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
