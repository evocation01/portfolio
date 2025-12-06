
import { t, type Dictionary } from "intlayer";

const aboutContent = {
    key: "about",
    content: {
        metaTitle: t({
            en: "About Me",
            tr: "Hakkımda",
        }),
        metaDescription: t({
            en: "Software Developer with a focus on Full Stack (Next.js/Node.js) and Data Science (Python). Experience building SaaS platforms from scratch, architecting ETL pipelines on Google Cloud, and deploying CI/CD workflows.",
            tr: "Full Stack (Next.js/Node.js) ve Veri Bilimi (Python) odaklı Yazılım Geliştirici. Sıfırdan SaaS platformları oluşturma, Google Cloud'da ETL işlem hatları mimarisi ve CI/CD iş akışları dağıtma deneyimi.",
        }),
        slug: t({
            en: "about",
            tr: "hakkimda",
        }),
        name: t({
            en: "Hakan İspir",
            tr: "Hakan İspir",
        }),
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
        resumeTitle: t({
            en: "Resume",
            tr: "Özgeçmiş",
        }),
        skills: [
            "Python",
            "JavaScript",
            "TypeScript",
            "R",
            "Java",
            "SQL",
            "React",
            "Next.js",
            "HTML5",
            "Tailwind CSS",
            "Node.js",
            "Express",
            "FastAPI",
            "PostgreSQL (Neon)",
            "Drizzle ORM",
            "PyTorch",
            "TensorFlow",
            "Keras",
            "Pandas",
            "NumPy",
            "Scikit-learn",
            "Microsoft Excel",
            "Power BI",
            "Google Looker Studio",
        ],
        experience: [
            {
                company: t({ en: "Koru Impact", tr: "Koru Impact" }),
                role: t({
                    en: "Founding Software Engineer",
                    tr: "Kurucu Yazılım Mühendisi",
                }),
                period: t({
                    en: "Sept 2025 – Current",
                    tr: "Eyl 2025 – Günümüz",
                }),
                description: t({
                    en: "Architecting data infrastructure and ETL services with Python/GCloud, building a full-stack analytics dashboard, and integrating AI capabilities for predictive modeling.",
                    tr: "Python/GCloud ile veri altyapısı ve ETL hizmetleri tasarlamak, tam yığın bir analiz panosu oluşturmak ve tahmine dayalı modelleme için yapay zeka yeteneklerini entegre etmek.",
                }),
            },
            {
                company: t({ en: "Koru Impact", tr: "Koru Impact" }),
                role: t({
                    en: "Software Engineer Intern",
                    tr: "Yazılım Mühendisi Stajyeri",
                }),
                period: t({
                    en: "July 2025 – Sept 2025",
                    tr: "Tem 2025 – Eyl 2025",
                }),
                description: t({
                    en: "Built the core SaaS platform using Next.js, engineered a CI/CD pipeline on GCP, and developed advanced features like a custom CMS with an AI editor and a Gemini chatbot.",
                    tr: "Next.js kullanarak temel SaaS platformunu oluşturdum, GCP üzerinde bir CI/CD işlem hattı tasarladım ve yapay zeka editörlü özel bir CMS ve bir Gemini sohbet botu gibi gelişmiş özellikler geliştirdim.",
                }),
            },
            {
                company: t({ en: "Gini Talent", tr: "Gini Talent" }),
                role: t({
                    en: "Data Entry / Search Quality Improvement Specialist (Freelance)",
                    tr: "Veri Girişi / Arama Kalitesi İyileştirme Uzmanı (Serbest)",
                }),
                period: t({ en: "2024 – 2025", tr: "2024 – 2025" }),
                description: t({
                    en: "Optimized search quality for global search engines by analyzing text data and improving content ranking algorithms.",
                    tr: "Metin verilerini analiz ederek ve içerik sıralama algoritmalarını iyileştirerek küresel arama motorları için arama kalitesini optimize ettim.",
                }),
            },
        ],
        education: {
            institution: t({
                en: "Marmara University",
                tr: "Marmara Üniversitesi",
            }),
            degree: t({
                en: "Bachelors of Industrial Engineering",
                tr: "Endüstri Mühendisliği Lisans Derecesi",
            }),
            period: t({ en: "2022 – 2026", tr: "2022 – 2026" }),
        },
        licenses: [
            t({
                en: "Deep Learning with PyTorch, Keras and Tensorflow - Professional Certificate (IBM-Coursera)",
                tr: "PyTorch, Keras ve Tensorflow ile Derin Öğrenme - Profesyonel Sertifika (IBM-Coursera)",
            }),
            t({
                en: "IT Automation with Python - Professional Certificate (Google-Coursera)",
                tr: "Python ile IT Otomasyonu - Profesyonel Sertifika (Google-Coursera)",
            }),
            t({
                en: "Front-End Developer - Professional Certificate (Meta-Coursera)",
                tr: "Ön Uç Geliştirici - Profesyonel Sertifika (Meta-Coursera)",
            }),
            t({
                en: "ODOO ERP Program Training (Marmara University)",
                tr: "ODOO ERP Programı Eğitimi (Marmara Üniversitesi)",
            }),
            t({
                en: "Traditional & Advanced Entrepreneurship Trainings (KOSGEB)",
                tr: "Geleneksel ve İleri Girişimcilik Eğitimleri (KOSGEB)",
            }),
        ],
        languages: [
            t({ en: "Turkish (Native)", tr: "Türkçe (Anadil)" }),
            t({ en: "English (Fluent, C1/C2)", tr: "İngilizce (Akıcı, C1/C2)" }),
            t({
                en: "Spanish (Intermediate, A2/B1)",
                tr: "İspanyolca (Orta, A2/B1)",
            }),
            t({ en: "German (Basics, A1/A2)", tr: "Almanca (Temel, A1/A2)" }),
        ],
        volunteering: [
            t({
                en: "DSC Development Committee (Member): 2023-2025",
                tr: "DSC Geliştirme Komitesi (Üye): 2023-2025",
            }),
            t({
                en: "MACSEC Career Committee (Member): 2023-2025",
                tr: "MACSEC Kariyer Komitesi (Üye): 2023-2025",
            }),
            t({
                en: "IEEE CS Committee (Member): 2023-2025",
                tr: "IEEE CS Komitesi (Üye): 2023-2025",
            }),
            t({
                en: "MieS Committee (Member): 2022-2023",
                tr: "MieS Komitesi (Üye): 2022-2023",
            }),
        ],
    },
} satisfies Dictionary;

export default aboutContent;
