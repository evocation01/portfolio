import homePageContent from "@/app/[locale]/homepage.content";
import { Locales } from "intlayer";

type ContentModule = {
    slug?: Partial<Record<keyof typeof Locales, string>>;
    [key: string]: unknown;
};

export const routeToContent: Record<string, ContentModule> = {
    "/": homePageContent.content,
};

export const slugToRoute: Record<string, string> = {};

for (const route in routeToContent) {
    const content = routeToContent[route];
    if (content.slug) {
        for (const locale in content.slug) {
            const slug = content.slug[locale as keyof typeof Locales];
            if (slug) {
                slugToRoute[slug] = route;
            }
        }
    }
}
