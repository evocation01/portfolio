import config from "@/intlayer.config";
import type { Locale } from "intlayer";

export const getCustomLocalizedUrl = (
    path: string,
    locale: Locale
): string => {
    if (!path.startsWith("/")) path = `/${path}`;

    // If the path already has the target locale, return it as is (prevent double prefixing)
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
        return path;
    }

    // Remove existing locale prefix if switching languages
    const segments = path.split("/");
    if (config.internationalization?.locales?.includes(segments[1] as Locale)) {
        segments.splice(1, 1);
        path = segments.join("/");
    }

    return `/${locale}${path}`;
};
