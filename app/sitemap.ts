// app/sitemap.ts
import config from "@/intlayer.config";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    console.log("[Sitemap] Generating sitemap...");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    
    // Check config and locales
    console.log("[Sitemap] intlayer.config:", config.internationalization);
    const locales = config.internationalization?.locales ?? [];
    const defaultLocale = config.internationalization?.defaultLocale ?? "en";
    console.log("[Sitemap] Locales:", locales, "Default Locale:", defaultLocale);

    const getLocalizedUrlForSitemap = (path: string, locale: string) => {
        if (locale === defaultLocale) {
            return `${baseUrl}${path}`;
        }
        return `${baseUrl}/${locale}${path}`;
    };

    // Static pages
    const staticPages = ["", "/about", "/projects", "/contact", "/login"]; // Include login page
    const staticUrls = staticPages.flatMap((page) =>
        locales.map((locale) => ({
            url: getLocalizedUrlForSitemap(page, locale),
            lastModified: new Date(),
        }))
    );
    console.log("[Sitemap] Generated static URLs count:", staticUrls.length);

    // Get all project slugs
    let projectSlugs = [];
    try {
        projectSlugs = await db.select({ slug: projects.slug }).from(projects);
        console.log("[Sitemap] Fetched project slugs count:", projectSlugs.length);
    } catch (dbError) {
        console.error("[Sitemap] Error fetching project slugs:", dbError);
        // If DB fails, proceed with only static URLs
        return staticUrls;
    }

    const projectUrls = projectSlugs.flatMap((project) =>
        locales.map((locale) => ({
            url: getLocalizedUrlForSitemap(`/projects/${project.slug}`, locale),
            lastModified: new Date(),
        }))
    );
    console.log("[Sitemap] Generated project URLs count:", projectUrls.length);

    const fullSitemap = [...staticUrls, ...projectUrls];
    console.log("[Sitemap] Total URLs in sitemap:", fullSitemap.length);
    return fullSitemap;
}
