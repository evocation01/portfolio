"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { LocalizedLink } from "./LocalizedLink";
import config from "@/intlayer.config";
import { usePathnameLocale } from "@/hooks/usePathnameLocale";

export function LanguageSwitcher() {
    const currentLocale = usePathnameLocale();
    const pathname = usePathname();

    // More robustly find the path without the locale prefix
    const getPathWithoutLocale = () => {
        const locales =
            (config.internationalization?.locales as string[]) ?? [];

        // Handles routes like /tr/projects -> /projects
        for (const loc of locales) {
            if (pathname.startsWith(`/${loc}/`)) {
                return pathname.substring(loc.length + 1);
            }
        }

        // Handles root locale paths like /tr -> /
        if (locales.some((loc) => `/${loc}` === pathname)) {
            return "/";
        }

        // Return the path as is if it doesn't have a locale prefix (e.g., /projects for default locale)
        return pathname;
    };

    const pathWithoutLocale = getPathWithoutLocale();

    return (
        <div className="flex items-center gap-1 border border-border rounded-md p-1">
            <Button
                variant={currentLocale === "en" ? "secondary" : "ghost"}
                size="sm"
                asChild
                className="h-7 text-xs px-2"
            >
                <LocalizedLink href={pathWithoutLocale} locale={"en"}>
                    EN
                </LocalizedLink>
            </Button>
            <Button
                variant={currentLocale === "tr" ? "secondary" : "ghost"}
                size="sm"
                asChild
                className="h-7 text-xs px-2"
            >
                <LocalizedLink href={pathWithoutLocale} locale={"tr"}>
                    TR
                </LocalizedLink>
            </Button>
        </div>
    );
}
