"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type projects } from "@/lib/schema";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Project = typeof projects.$inferSelect;

export function ProjectCard({ project }: { project: Project }) {
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
                                alt={project.title_en}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="p-4">
                        <CardHeader className="p-0">
                            <CardTitle>{project.title_en}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 pt-2">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {project.description_en}
                            </p>
                        </CardContent>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}
