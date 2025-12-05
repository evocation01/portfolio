import { t, type Dictionary } from "intlayer";

const aboutContent = {
    key: "about",
    content: {
        pageTitle: t({
            en: "About Me",
            tr: "Hakkımda",
        }),
        jobTitle: t({
            en: "Full-Stack Developer | AI Engineer",
            tr: "Full-Stack Geliştirici | Yapay Zeka Mühendisi",
        }),
        profile: t({
            en: "Software Developer with a focus on Full Stack (Next.js/Node.js) and Data Science (Python). Experience building SaaS platforms from scratch, architecting ETL pipelines on Google Cloud, and deploying CI/CD workflows.",
            tr: "Full Stack (Next.js/Node.js) ve Veri Bilimi (Python) odaklı Yazılım Geliştirici. Sıfırdan SaaS platformları oluşturma, Google Cloud'da ETL işlem hatları mimarisi ve CI/CD iş akışları dağıtma deneyimi.",
        }),
        skillsTitle: t({
            en: "Skills",
            tr: "Yetenekler",
        }),
        experienceTitle: t({
            en: "Work Experience",
            tr: "İş Deneyimi",
        }),
        educationTitle: t({
            en: "Education",
            tr: "Eğitim",
        }),
        licensesTitle: t({
            en: "Licenses & Certifications",
            tr: "Lisanslar ve Sertifikalar",
        }),
        languagesTitle: t({
            en: "Languages",
            tr: "Diller",
        }),
        volunteeringTitle: t({
            en: "Volunteering & Leadership",
            tr: "Gönüllülük ve Liderlik",
        }),
    },
} satisfies Dictionary;

export default aboutContent;