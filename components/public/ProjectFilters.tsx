"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function ProjectFilters({ allTags }: { allTags: string[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1"); // Reset page on new search
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        startTransition(() => {
            replace(`${pathname}?${params.toString()}`);
        });
    };

    const handleTagFilter = (tag: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1"); // Reset page on new filter
        if (params.get("tag") === tag || tag === "") {
            params.delete("tag");
        } else {
            params.set("tag", tag);
        }
        startTransition(() => {
            replace(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-1/3">
                <Input
                    placeholder="Search projects..."
                    defaultValue={searchParams.get("query")?.toString()}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <ScrollArea className="w-full md:w-2/3 whitespace-nowrap">
                <div className="flex w-max space-x-2">
                    <Button
                        variant={!searchParams.get("tag") ? "default" : "outline"}
                        onClick={() => handleTagFilter("")}
                    >
                        All
                    </Button>
                    {allTags.map((tag) => (
                        <Button
                            key={tag}
                            variant={searchParams.get("tag") === tag ? "default" : "outline"}
                            onClick={() => handleTagFilter(tag)}
                        >
                            {tag}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}