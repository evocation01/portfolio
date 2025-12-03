"use client";
import config from "@/intlayer.config";
import type { Locale } from "intlayer";
import { useParams } from "next/navigation";

export const usePathnameLocale = (): Locale => {
    const params = useParams();
    const defaultLocale = config.internationalization?.defaultLocale ?? "en";

    // Ensure we return a valid locale from our config, fallback to default
    if (params && typeof params.locale === "string") {
        // We cast strictly because middleware ensures validity
        return params.locale as Locale;
    }

    return defaultLocale;
};
