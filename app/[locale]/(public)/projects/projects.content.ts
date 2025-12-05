import { t, type Dictionary } from "intlayer";

const projectsContent = {
    key: "projects",
    content: {
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
    },
} satisfies Dictionary;

export default projectsContent;
