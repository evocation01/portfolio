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
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-12">
            <Button
                variant="outline"
                asChild
                disabled={!hasPreviousPage}
                className="px-2 sm:px-4"
            >
                <Link
                    href={`${baseUrl}?page=${currentPage - 1}`}
                    className={
                        !hasPreviousPage ? "pointer-events-none opacity-50" : ""
                    }
                    aria-label={previousPage}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">{previousPage}</span>
                </Link>
            </Button>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
                {formattedIndicator}
            </span>
            <Button
                variant="outline"
                asChild
                disabled={!hasNextPage}
                className="px-2 sm:px-4"
            >
                <Link
                    href={`${baseUrl}?page=${currentPage + 1}`}
                    className={
                        !hasNextPage ? "pointer-events-none opacity-50" : ""
                    }
                    aria-label={nextPage}
                >
                    <span className="hidden sm:inline mr-2">{nextPage}</span>
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </Button>
        </div>
    );
}
