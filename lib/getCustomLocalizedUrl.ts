// lib/getCustomLocalizedUrl.ts
import { getLocalizedUrl, type Locale } from "intlayer"; // getLocalizedUrl from next-intlayer
import rewrites from "../rewrites.json"; // Adjusted path to rewrites.json

type Rewrite = { source: string; destination: string };
const typedRewrites = rewrites as Rewrite[];

/**
 * Generates a localized URL using the mappings from rewrites.json.
 * This allows client-side links to use translated slugs that the Next.js server
 * will rewrite to the correct page.
 * It handles both static and dynamic routes (e.g., /path/:param).
 *
 * @param path - The canonical, non-localized path (e.g., "/about").
 * @param locale - The target locale (e.g., "tr").
 * @returns The fully localized and translated URL string.
 */
export function getCustomLocalizedUrl(path: string, locale: Locale): string {
  // First, get the default localized path (e.g., /tr/about)
  // This uses intlayer's own getLocalizedUrl which adds the locale prefix if not default
  const defaultLocalizedPath = getLocalizedUrl(path, locale);

  // Handle case where getLocalizedUrl returns undefined (shouldn't happen with valid intlayer setup)
  if (!defaultLocalizedPath) {
    console.warn(
      `getLocalizedUrl returned undefined for path: ${path}, locale: ${locale}`
    );
    // Fallback: Manually construct the localized path
    const defaultLocale = "en"; // Assuming 'en' is always the default and unprefixed
    if (locale === defaultLocale) {
        return path; // No prefix for default locale
    }
    return `/${locale}${path}`; // Add prefix for other locales
  }

  // Find a matching rewrite rule for the default localized path.
  for (const rewrite of typedRewrites) {
    const { source, destination } = rewrite;

    // We need to match the destination pattern to the defaultLocalizedPath
    // And if it matches, return the source
    // Note: My rewrites.json uses canonical path as destination.
    // So if destination is "/tr/about", source is "/tr/hakkimda"
    // And defaultLocalizedPath is "/tr/about"
    // We want to return source if defaultLocalizedPath matches destination

    // Handle dynamic routes (contains ':') in destination
    if (destination.includes(":")) {
      // Convert the destination pattern (e.g., /tr/about/:id) into a regex
      // Need to adjust for unprefixed default locale if destination is "/about/:id"
      const effectiveDestination = locale === "en" && destination.startsWith("/en")
        ? destination.substring(3) // Remove /en/
        : destination;

      const destinationRegex = new RegExp(
        `^${effectiveDestination.replace(/:\w+/g, "([^/]+)")}$`
      );
      const match = defaultLocalizedPath.match(destinationRegex);

      if (match) {
        // If it matches, we build the translated URL from the source pattern.
        const params = match.slice(1);
        let translatedPath = source;

        // Get param names from the destination (e.g., ['id'])
        const paramNames = (effectiveDestination.match(/:\w+/g) || []).map((p) =>
          p.substring(1)
        );

        // Replace the param placeholders in the source string with the actual values
        paramNames.forEach((paramName, index) => {
          translatedPath = translatedPath.replace(
            `:${paramName}`,
            params[index]
          );
        });

        return translatedPath;
      }
    } else {
      // If it's a simple static path, do a direct comparison.
      // Need to adjust for unprefixed default locale if destination is "/about" and defaultLocalizedPath is "/about"
      const effectiveDestination = locale === "en" && destination.startsWith("/en")
        ? destination.substring(3) // Remove /en/
        : destination;

      if (effectiveDestination === defaultLocalizedPath) {
        return source;
      }
    }
  }

  // If no specific rewrite rule is found, return the default localized path.
  // We need to remove the locale prefix for the default locale, as getLocalizedUrl adds it by default
  const defaultLocale = "en"; // Assuming 'en' is always the default and unprefixed
  if (locale === defaultLocale && defaultLocalizedPath.startsWith(`/${defaultLocale}`)) {
      return defaultLocalizedPath.substring(3); // Remove /en/ prefix
  }

  return defaultLocalizedPath;
}