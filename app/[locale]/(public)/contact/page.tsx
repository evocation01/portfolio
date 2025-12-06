// app/[locale]/(public)/contact/page.tsx
import { getIntlayer } from "next-intlayer";
import type { Metadata, Viewport } from "next";
import contactContent from "./contact.content";
import ContactPageClient from "./client-page";

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const awaitedParams = await params;
    const content = getIntlayer(contactContent.key, awaitedParams.locale);
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const getLocalizedUrl = (locale: string) => {
        if (locale === "en") {
            return `${baseUrl}/contact`;
        }
        return `${baseUrl}/${locale}/contact`;
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

export default function ContactPage() {
    return <ContactPageClient />;
}
