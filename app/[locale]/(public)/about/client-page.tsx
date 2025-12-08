// app/[locale]/(public)/about/page.tsx
"use client";

import { ResumeViewer } from "@/components/ResumeViewer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";
import { getIntlayer, useIntlayer } from "next-intlayer";
import aboutContent from "./about.content";

export async function generateMetadata(props: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const params = await props.params;
    const content = getIntlayer(aboutContent.key, params.locale);
    return {
        title: content.pageTitle,
        description: content.profile,
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
                        alt={aboutContent.name}
                    />
                    <AvatarFallback>HI</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {aboutContent.name}
                    </h1>
                    <p className="mt-2 text-lg sm:text-xl text-muted-foreground">
                        {aboutContent.jobTitle}
                    </p>
                </div>
            </header>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.pageTitle}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {aboutContent.profile}
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.skillsTitle}
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
                    {aboutContent.experienceTitle}
                </h2>
                <div className="space-y-8">
                    {aboutContent.experience.map((job: any, index: number) => (
                        <div key={index}>
                            <h3 className="text-xl sm:text-2xl font-semibold">
                                {job.role}
                            </h3>
                            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
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
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.educationTitle}
                </h2>
                <div>
                    <h3 className="text-xl sm:text-2xl font-semibold">
                        {aboutContent.education.degree}
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                        <p className="font-medium text-primary">
                            {aboutContent.education.institution}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {aboutContent.education.period}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.licensesTitle}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {aboutContent.licenses.map(
                        (license: any, index: number) => (
                            <li key={index}>{license}</li>
                        )
                    )}
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.languagesTitle}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {aboutContent.languages.map(
                        (language: any, index: number) => (
                            <li key={index}>{language}</li>
                        )
                    )}
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.volunteeringTitle}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {aboutContent.volunteering.map(
                        (role: any, index: number) => (
                            <li key={index}>{role}</li>
                        )
                    )}
                </ul>
            </section>

            <section>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2">
                    {aboutContent.resumeTitle}
                </h2>
                <ResumeViewer />
            </section>
        </div>
    );
}
