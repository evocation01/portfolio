import aboutContent from "@/app/[locale]/(public)/about/about.content";
import contactContent from "@/app/[locale]/(public)/contact/contact.content";
import homePageContent from "@/app/[locale]/(public)/homepage.content";
import projectsContent from "@/app/[locale]/(public)/projects/projects.content";
import headerContent from "@/components/layouts/header.content";
import { Locales } from "intlayer";

type ContentModule = {
    slug?: Partial<Record<keyof typeof Locales, string>>;
    [key: string]: unknown;
};

export const routeToContent: Record<string, ContentModule> = {
    "/": homePageContent.content,
    "/about": aboutContent.content,
    "/contact": contactContent.content,
    "/projects": projectsContent.content,
    "/layout/header": headerContent.content,
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
