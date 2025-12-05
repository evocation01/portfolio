import { t, type Dictionary } from "intlayer";

const homepageContent = {
    key: "homepage",
    content: {
        title: t({
            en: "Hakan İspir",
            tr: "Hakan İspir",
        }),
        description: t({
            en: "Full-Stack Developer with a focus on Next.js/Node.js and an AI Engineer with a passion for Data Science (Python). Experienced in building SaaS platforms from scratch, architecting ETL pipelines on Google Cloud, and deploying CI/CD workflows.",
            tr: "Next.js/Node.js odaklı bir Full-Stack Geliştirici ve Veri Bilimi (Python) tutkusuna sahip bir Yapay Zeka Mühendisi. Sıfırdan SaaS platformları oluşturma, Google Cloud üzerinde ETL işlem hatları tasarlama ve CI/CD iş akışları dağıtma konularında deneyimli.",
        }),
        viewWork: t({
            en: "View My Work",
            tr: "Çalışmalarımı Gör",
        }),
        contactMe: t({
            en: "Contact Me",
            tr: "İletişime Geç",
        }),
        welcome: t({
            en: "Welcome",
            tr: "Hoş Geldiniz",
        }),
        featuredProjects: t({
            en: "Featured Projects",
            tr: "Öne Çıkan Projeler",
        }),
    },
} satisfies Dictionary;

export default homepageContent;
