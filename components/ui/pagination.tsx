"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl?: string;
    previousPage: string;
    nextPage: string;
    pageIndicator: string;
}

export function Pagination({
    currentPage,
    totalPages,
    baseUrl = "/projects",
    previousPage,
    nextPage,
    pageIndicator,
}: PaginationProps) {
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    const formattedIndicator = pageIndicator
        .replace("{currentPage}", String(currentPage))
        .replace("{totalPages}", String(totalPages));

    return (
        <div className="flex items-center justify-center space-x-4 mt-12">
            <Button variant="outline" asChild disabled={!hasPreviousPage}>
                <Link
                    href={`${baseUrl}?page=${currentPage - 1}`}
                    className={
                        !hasPreviousPage ? "pointer-events-none opacity-50" : ""
                    }
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {previousPage}
                </Link>
            </Button>
            <span className="text-sm text-muted-foreground">
                {formattedIndicator}
            </span>
            <Button variant="outline" asChild disabled={!hasNextPage}>
                <Link
                    href={`${baseUrl}?page=${currentPage + 1}`}
                    className={
                        !hasNextPage ? "pointer-events-none opacity-50" : ""
                    }
                >
                    {nextPage}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
    );
}
