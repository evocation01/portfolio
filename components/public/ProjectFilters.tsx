"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { type tags } from "@/lib/schema";

type Tag = typeof tags.$inferSelect;
type MasterTag = Tag & { children: Tag[] };

export function ProjectFilters({
    masterTags,
    searchPlaceholder,
    allTagsLabel,
}: {
    masterTags: MasterTag[];
    searchPlaceholder: string;
    allTagsLabel: string;
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isPending, startTransition] = useTransition();

    const activeTag = searchParams.get("tag") || "";

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        startTransition(() => {
            replace(`${pathname}?${params.toString()}`);
        });
    };

    const handleTagFilter = (tagName: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (activeTag === tagName || tagName === "") {
            params.delete("tag");
        } else {
            params.set("tag", tagName);
        }
        startTransition(() => {
            replace(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 gap-4">
            <div className="relative w-full md:max-w-xs">
                <Input
                    placeholder={searchPlaceholder}
                    defaultValue={searchParams.get("query")?.toString()}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <ScrollArea className="w-full md:w-auto">
                <div className="flex w-max space-x-2 pb-4">
                    <Button
                        variant={!activeTag ? "default" : "outline"}
                        onClick={() => handleTagFilter("")}
                    >
                        {allTagsLabel}
                    </Button>
                    {masterTags.map((master) => (
                        <HoverCard key={master.id} openDelay={200}>
                            <HoverCardTrigger asChild>
                                <Button
                                    variant={
                                        activeTag === master.name ? "default" : "outline"
                                    }
                                    onClick={() => handleTagFilter(master.name)}
                                >
                                    {master.name}
                                </Button>
                            </HoverCardTrigger>
                            {master.children.length > 0 && (
                                <HoverCardContent className="w-48">
                                    <div className="flex flex-col gap-1">
                                        {master.children.map((child) => (
                                            <Button
                                                key={child.id}
                                                variant={
                                                    activeTag === child.name
                                                        ? "secondary"
                                                        : "ghost"
                                                }
                                                className="w-full justify-start"
                                                onClick={() => handleTagFilter(child.name)}
                                            >
                                                {child.name}
                                            </Button>
                                        ))}
                                    </div>
                                </HoverCardContent>
                            )}
                        </HoverCard>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
