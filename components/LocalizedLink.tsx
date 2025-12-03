"use client";

import { useLocale } from "next-intlayer";
import Link from "next/link";
import { type ComponentProps, forwardRef } from "react";
import type { Locale } from "intlayer";
import config from "@/intlayer.config";

type LocalizedLinkProps = ComponentProps<typeof Link> & {
    locale?: Locale;
};

export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
    ({ href, locale, ...props }, ref) => {
        const { locale: currentLocale } = useLocale();
        const targetLocale = locale || currentLocale;
        const defaultLocale =
            config.internationalization?.defaultLocale ?? "en";

        const path =
            typeof href === "string" ? href : href.pathname || "";

        // Prepend locale prefix only if it's not the default locale
        const finalHref =
            targetLocale !== defaultLocale ? `/${targetLocale}${path}` : path;

        // Next.js Link requires href to be a single string. Handle root path correctly.
        const finalPath = finalHref.startsWith("//")
            ? finalHref.substring(1)
            : finalHref;

        return (
            <Link
                href={finalPath || "/"}
                {...props}
                ref={ref}
            />
        );
    }
);

LocalizedLink.displayName = "LocalizedLink";