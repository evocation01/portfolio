"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type projects } from "@/lib/schema";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Project = typeof projects.$inferSelect;

export function ProjectCard({
    project,
    locale,
}: {
    project: Project;
    locale: string;
}) {
    const title = locale === "tr" ? project.title_tr : project.title_en;
    const description =
        locale === "tr" ? project.description_tr : project.description_en;

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
        >
            <Link
                href={`/projects/${project.slug}`}
                className="block"
            >
                <Card className="text-left h-full hover:border-primary transition-colors overflow-hidden">
                    {project.thumbnail_url && (
                        <div className="relative w-full aspect-video">
                            <Image
                                src={project.thumbnail_url}
                                alt={title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="p-4">
                        <CardHeader className="p-0">
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 pt-2">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {description}
                            </p>
                        </CardContent>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}
