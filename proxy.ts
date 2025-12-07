import { intlayerMiddleware } from "next-intlayer/middleware";

/**
 * Next.js 16 Proxy (formerly middleware.ts)
 * Acts as the network boundary for routing, rewrites, and redirects.
 */

// Use the built-in Intlayer middleware which handles locale detection and redirects
export default intlayerMiddleware;

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         *
         * It also excludes any files that have a file extension (e.g., .svg, .js, .css)
         * which will correctly ignore the Vercel Analytics script.
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};
