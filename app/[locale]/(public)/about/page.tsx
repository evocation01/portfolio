// app/[locale]/(public)/about/page.tsx
"use client";

import { ResumeViewer } from "@/components/ResumeViewer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useIntlayer } from "next-intlayer";

// Data sourced from docs/041225_CV.md
const cvData = {
    name: "Hakan İspir",
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
            company: "Koru Impact",
            role: "Founding Software Engineer",
            period: "Sept 2025 – Current",
            description:
                "Architecting data infrastructure and ETL services with Python/GCloud, building a full-stack analytics dashboard, and integrating AI capabilities for predictive modeling.",
        },
        {
            company: "Koru Impact",
            role: "Software Engineer Intern",
            period: "July 2025 – Sept 2025",
            description:
                "Built the core SaaS platform using Next.js, engineered a CI/CD pipeline on GCP, and developed advanced features like a custom CMS with an AI editor and a Gemini chatbot.",
        },
        {
            company: "Gini Talent",
            role: "Data Entry / Search Quality Improvement Specialist (Freelance)",
            period: "2024 – 2025",
            description:
                "Optimized search quality for global search engines by analyzing text data and improving content ranking algorithms.",
        },
    ],
    education: {
        institution: "Marmara University",
        degree: "Bachelors of Industrial Engineering",
        period: "2022 – 2026",
    },
    licenses: [
        "Deep Learning with PyTorch, Keras and Tensorflow - Professional Certificate (IBM-Coursera)",
        "IT Automation with Python - Professional Certificate (Google-Coursera)",
        "Front-End Developer - Professional Certificate (Meta-Coursera)",
        "ODOO ERP Program Training (Marmara University)",
        "Traditional & Advanced Entrepreneurship Trainings (KOSGEB)",
    ],
    languages: [
        "Turkish (Native)",
        "English (Fluent, C1/C2)",
        "Spanish (Intermediate, A2/B1)",
        "German (Basics, A1/A2)",
    ],
    volunteering: [
        "DSC Development Committee (Member): 2023-2025",
        "MACSEC Career Committee (Member): 2023-2025",
        "IEEE CS Committee (Member): 2023-2025",
        "MieS Committee (Member): 2022-2023",
    ],
};

export default function AboutPage() {
    const { title, description } = useIntlayer("homepage");
    const aboutContent = useIntlayer("about");

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <Avatar className="h-16 w-16">
                    <AvatarImage src="/assets/headshot.jpg" alt={cvData.name} />
                    <AvatarFallback>HI</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {cvData.name}
                    </h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                        {aboutContent.jobTitle}
                    </p>
                </div>
            </header>

            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.pageTitle}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {aboutContent.profile}
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.skillsTitle}
                </h2>
                <div className="flex flex-wrap gap-2">
                    {cvData.skills.map((skill) => (
                        <Badge
                            key={skill}
                            variant="secondary"
                            className="text-md"
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.experienceTitle}
                </h2>
                <div className="space-y-8">
                    {cvData.experience.map((job) => (
                        <div key={job.company + job.role}>
                            <h3 className="text-2xl font-semibold">
                                {job.role}
                            </h3>
                            <div className="flex justify-between items-baseline">
                                <p className="font-medium text-primary">
                                    {job.company}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {job.period}
                                </p>
                            </div>
                            <p className="mt-2 text-muted-foreground">
                                {job.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.educationTitle}
                </h2>
                <div>
                    <h3 className="text-2xl font-semibold">
                        {cvData.education.degree}
                    </h3>
                    <div className="flex justify-between items-baseline">
                        <p className="font-medium text-primary">
                            {cvData.education.institution}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {cvData.education.period}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.licensesTitle}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {cvData.licenses.map((license) => (
                        <li key={license}>{license}</li>
                    ))}
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.languagesTitle}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {cvData.languages.map((language) => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.volunteeringTitle}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {cvData.volunteering.map((role) => (
                        <li key={role}>{role}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-4 border-b pb-2">
                    Resume
                </h2>
                <ResumeViewer />
            </section>
        </div>
    );
}
