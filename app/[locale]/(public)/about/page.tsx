// app/[locale]/(public)/about/page.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
    // Placeholder data - you can replace this with your actual information
    const skills = [
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Drizzle ORM",
        "PostgreSQL",
        "Tailwind CSS",
        "GraphQL",
        "Docker",
    ];

    const experience = [
        {
            company: "Tech Solutions Inc.",
            role: "Senior Full-Stack Developer",
            period: "2021 - Present",
            description:
                "Led the development of a high-traffic e-commerce platform using Next.js and a serverless backend. Implemented a new design system with Shadcn UI and optimized database queries, reducing page load times by 40%.",
        },
        {
            company: "Innovate Co.",
            role: "Software Engineer",
            period: "2019 - 2021",
            description:
                "Developed and maintained client-facing web applications using React and Node.js. Contributed to a large-scale migration from a monolithic architecture to a microservices-based approach.",
        },
    ];

    const education = {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        period: "2015 - 2019",
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Hakan" />
                    <AvatarFallback>HI</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Hakan Ispir
                    </h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                        Full-Stack Developer & Tech Enthusiast
                    </p>
                </div>
            </header>

            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 border-b pb-2">
                    About Me
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    I am a passionate Full-Stack Developer with a knack for
                    building robust, scalable, and user-friendly web
                    applications. With a strong foundation in modern JavaScript
                    frameworks and a keen eye for detail, I enjoy tackling
                    complex problems and turning ideas into reality.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 border-b pb-2">
                    Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
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
                    Work Experience
                </h2>
                <div className="space-y-8">
                    {experience.map((job) => (
                        <div key={job.company}>
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

            <section>
                <h2 className="text-3xl font-bold mb-4 border-b pb-2">
                    Education
                </h2>
                <div>
                    <h3 className="text-2xl font-semibold">
                        {education.degree}
                    </h3>
                    <div className="flex justify-between items-baseline">
                        <p className="font-medium text-primary">
                            {education.institution}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {education.period}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
