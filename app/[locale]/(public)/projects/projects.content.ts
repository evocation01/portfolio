import { t, type Dictionary } from "intlayer";

const projectsContent = {
    key: "projects",
    content: {
        metaTitle: t({
            en: "Projects",
            tr: "Projeler",
        }),
        metaDescription: t({
            en: "Explore a collection of my latest and most impactful projects in full-stack development and AI engineering.",
            tr: "Full-stack geliştirme ve yapay zeka mühendisliği alanındaki en yeni ve etkili projelerimi keşfedin.",
        }),
        slug: t({
            en: "projects",
            tr: "projeler",
        }),
        // For /projects list page
        pageTitle: t({
            en: "My Work",
            tr: "Çalışmalarım",
        }),
        pageDescription: t({
            en: "A collection of my projects.",
            tr: "Projelerimden bir derleme.",
        }),
        noProjects: t({
            en: "No projects have been added yet.",
            tr: "Henüz hiç proje eklenmedi.",
        }),

        // For /projects/[slug] detail page
        detailTitle: t({
            en: "Project Details",
            tr: "Proje Detayları",
        }),

        // For ProjectFilters component
        searchPlaceholder: t({
            en: "Search projects...",
            tr: "Proje ara...",
        }),
        allTags: t({
            en: "All",
            tr: "Tümü",
        }),

        // For Pagination component
        previousPage: t({
            en: "Previous",
            tr: "Önceki",
        }),
        nextPage: t({
            en: "Next",
            tr: "Sonraki",
        }),
        pageIndicator: t({
            en: "Page {currentPage} of {totalPages}",
            tr: "Sayfa {currentPage} / {totalPages}",
        }),
    },
} satisfies Dictionary;

export default projectsContent;