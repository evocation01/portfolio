import { intlayerMiddleware } from "next-intlayer/middleware";

/**
 * Next.js 16 Proxy (formerly middleware.ts)
 * Acts as the network boundary for routing, rewrites, and redirects.
 */

// Use the built-in Intlayer middleware which handles locale detection and redirects
export default intlayerMiddleware;

export const config = {
    // Matcher ignoring internal Next.js paths, API routes, and static assets
    matcher: ["/((?!api|static|assets|favicon.ico|coding-icon.svg|_next|robots.txt|sitemap.xml).*)"],
};
