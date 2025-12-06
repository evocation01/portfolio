"use client";

import { getCustomLocalizedUrl } from "@/lib/getCustomLocalizedUrl"; // New import
import { usePathnameLocale } from "@/hooks/usePathnameLocale";
import config from "@/intlayer.config";
import type { Locale } from "intlayer";
import Link from "next/link";
import { type ComponentProps, forwardRef } from "react";

type LocalizedLinkProps = ComponentProps<typeof Link> & {
    locale?: Locale;
};

export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
    ({ href, locale, ...props }, ref) => {
        const currentLocale = usePathnameLocale();
        const targetLocale = locale || currentLocale;
        // The defaultLocale is handled within getCustomLocalizedUrl now.

        const path = typeof href === "string" ? href : href.pathname || "";

        // Construct the final URL using the new helper
        const finalPath = getCustomLocalizedUrl(path, targetLocale);

        return <Link href={finalPath || "/"} {...props} ref={ref} />;
    }
);

LocalizedLink.displayName = "LocalizedLink";
