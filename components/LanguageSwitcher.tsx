"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // Corrected import path
import { usePathnameLocale } from "@/hooks/usePathnameLocale";
import { useRouter } from "next/navigation";
import rewrites from "../rewrites.json"; // Path to rewrites.json relative to components/LanguageSwitcher.tsx

// --- Type Definitions ---
type Rewrite = { source: string; destination: string };
const typedRewrites = rewrites as Rewrite[];

// ❗️ All this map creation logic must be here, OUTSIDE the component function.
// This ensures it runs only once.
// --- A Robust, Bidirectional Routing Map ---
const canonicalMap = new Map<
    string,
    { en: string; tr: string; paramNames: string[] }
>();

const reverseLookupMap = new Map<RegExp, string>();

// --- Pre-process rewrites.json to build the maps ---
typedRewrites.forEach(({ source, destination }) => {
    // Adjust source/destination based on whether they are prefixed for default locale
    const processPath = (p: string, locale: string) => {
        if (locale === "en" && p.startsWith("/en")) {
            return p.substring(3); // Remove /en prefix for default locale
        }
        return p;
    };

    const canonicalPattern = processPath(destination, "en"); // Destination is the canonical path without /en
    const paramNames = (canonicalPattern.match(/:\w+/g) || []).map((p) =>
        p.substring(1)
    );

    const englishPathPattern =
        canonicalPattern === "/" ? "/" : `/${canonicalPattern.substring(1)}`; // No /en prefix

    canonicalMap.set(canonicalPattern, {
        en: englishPathPattern,
        tr: source, // Source is the /tr/hakkimda style path
        paramNames,
    });

    // Populate the reverse lookup map for both languages
    const trRegex = new RegExp("^" + source.replace(/:\w+/g, "([^/]+)") + "$");
    reverseLookupMap.set(trRegex, canonicalPattern);

    const enRegex = new RegExp(
        "^" + englishPathPattern.replace(/:\w+/g, "([^/]+)") + "$"
    );
    reverseLookupMap.set(enRegex, canonicalPattern);
});

export function LanguageSwitcher() {
    const locale = usePathnameLocale();
    const router = useRouter();

    const handleLocaleChange = (newLocale: string) => {
        const fullCurrentPath = window.location.pathname;
        let canonicalPattern: string | undefined;
        let paramValues: string[] = [];

        // This loop can now find `reverseLookupMap` because it's in the same module scope.
        for (const [regex, pattern] of reverseLookupMap.entries()) {
            const match = fullCurrentPath.match(regex);
            if (match) {
                canonicalPattern = pattern;
                paramValues = match.slice(1);
                break;
            }
        }

        if (canonicalPattern) {
            const localizedPatterns = canonicalMap.get(canonicalPattern)!;
            const newPathPattern = localizedPatterns[newLocale as "en" | "tr"]; // e.g., "/hakkimda" or "/tr/hakkimda"
            const { paramNames } = localizedPatterns;

            let newPath = newPathPattern;
            paramNames.forEach((name, index) => {
                newPath = newPath.replace(`:${name}`, paramValues[index]);
            });

            // Handle unprefixed default locale for English
            if (newLocale === "en" && newPath.startsWith("/en")) {
                newPath = newPath.substring(3); // Remove /en prefix
            } else if (
                newLocale !== "en" &&
                !newPath.startsWith(`/${newLocale}`)
            ) {
                // Ensure non-default locales are prefixed
                newPath = `/${newLocale}${newPath}`;
            }

            router.replace(newPath);
            router.refresh();
        } else {
            // Fallback if no specific pattern is found in the map
            // This part needs to be careful about prefixing if not already handled
            const fallbackCanonical =
                fullCurrentPath.replace(`/${locale}`, "") || "/";

            let newPath = "";
            if (newLocale === "en") {
                newPath = fallbackCanonical; // No prefix for default English
            } else {
                newPath = `/${newLocale}${fallbackCanonical}`;
            }

            router.replace(newPath);
            router.refresh();
        }
    };

    return (
        <Select onValueChange={handleLocaleChange} value={locale}>
            <SelectTrigger className="w-full" style={{ zIndex: 99999 }}>
                <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent style={{ zIndex: 99999 }}>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="tr">Türkçe</SelectItem>
            </SelectContent>
        </Select>
    );
}
