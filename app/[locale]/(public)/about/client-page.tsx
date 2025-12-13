// app/[locale]/(public)/about/page.tsx
"use client";

import { ContraButton } from "@/components/ContraButton";
import { ResumeViewer } from "@/components/ResumeViewer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin } from "lucide-react";
import type { Metadata } from "next";
import { getIntlayer, useIntlayer } from "next-intlayer";
import aboutContent from "./about.content";

export async function generateMetadata(props: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const params = await props.params;
    const content = getIntlayer(aboutContent.key, params.locale);
    return {
        title: content.pageTitle.value,
        description: content.profile.value,
    };
}

export default function AboutPageClient() {
    const aboutContent = useIntlayer("about");

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <Avatar className="h-20 w-20 md:h-24 md:w-24">
                    <AvatarImage
                        src="/assets/headshot.jpg"
                        alt={aboutContent.name.value}
                    />
                    <AvatarFallback>HI</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {aboutContent.name.value}
                    </h1>
                    <p className="mt-2 text-lg sm:text-xl text-muted-foreground">
                        {aboutContent.jobTitle.value}
                    </p>
                    <div className="mt-4 flex justify-center md:justify-start gap-4">
                        <a href="https://github.com/evocation01" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                        </a>
                        <a href="https://linkedin.com/in/hakanispir" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                        </a>
                    </div>
                </div>
            </header>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.pageTitle.value}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {aboutContent.profile.value}
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.skillsTitle.value}
                </h2>
                <div className="flex flex-wrap gap-2">
                    {aboutContent.skills.map((skill: any, index: number) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="text-sm sm:text-md"
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.experienceTitle.value}
                </h2>
                <div className="space-y-8">
                    {aboutContent.experience.map((job: any, index: number) => (
                        <div key={index}>
                            <h3 className="text-xl sm:text-2xl font-semibold">
                                {job.role.value}
                            </h3>
                            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                                <p className="font-medium text-primary">
                                    {job.company.value}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {job.period.value}
                                </p>
                            </div>
                            <p className="mt-2 text-muted-foreground">
                                {job.description.value}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.educationTitle.value}
                </h2>
                <div>
                    <h3 className="text-xl sm:text-2xl font-semibold">
                        {aboutContent.education.degree.value}
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                        <p className="font-medium text-primary">
                            {aboutContent.education.institution.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {aboutContent.education.period.value}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.licensesTitle.value}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {aboutContent.licenses.map(
                        (license: any, index: number) => (
                            <li key={index}>{license.value}</li>
                        )
                    )}
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.languagesTitle.value}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {aboutContent.languages.map(
                        (language: any, index: number) => (
                            <li key={index}>{language.value}</li>
                        )
                    )}
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.volunteeringTitle.value}
                </h2>
                <ul className="list-disc list-inside space-y-.  2 text-muted-foreground">
                    {aboutContent.volunteering.map(
                        (role: any, index: number) => (
                            <li key={index}>{role.value}</li>
                        )
                    )}
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.resumeTitle.value}
                </h2>
                <ResumeViewer />
            </section>
        </div>
    );
}
