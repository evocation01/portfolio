// app/[locale]/login/page.tsx
import { getIntlayer } from "next-intlayer";
import type { Metadata, Viewport } from "next";
import loginContent from "./login.content";
import LoginPageClient from "./client-page";

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const awaitedParams = await params;
    const content = getIntlayer(loginContent.key, awaitedParams.locale);
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const getLocalizedUrl = (locale: string) => {
        if (locale === "en") {
            return `${baseUrl}/login`;
        }
        return `${baseUrl}/${locale}/login`;
    };

    return {
        title: content.metaTitle.value,
        description: content.metaDescription.value,
        alternates: {
            canonical: getLocalizedUrl(awaitedParams.locale),
            languages: {
                en: getLocalizedUrl("en"),
                tr: getLocalizedUrl("tr"),
                "x-default": getLocalizedUrl("en"),
            },
        },
    };
}

export function generateViewport(): Viewport {
    return {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    };
}

export default function LoginPage() {
    return <LoginPageClient />;
}
