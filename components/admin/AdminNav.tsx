// components/admin/AdminNav.tsx
"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LocalizedLink } from "@/components/LocalizedLink";

export function AdminNav() {
    const pathname = usePathname();

    const links = [
        { href: "/admin", label: "Projects" },
        { href: "/admin/tags", label: "Tags" },
    ];

    return (
        <nav className="flex items-center gap-2 border-b mb-6">
            {links.map((link) => {
                const isActive = pathname.endsWith(link.href);
                return (
                    <Button
                        key={link.href}
                        variant={isActive ? "secondary" : "ghost"}
                        asChild
                        className="rounded-b-none"
                    >
                        <LocalizedLink href={link.href}>{link.label}</LocalizedLink>
                    </Button>
                );
            })}
        </nav>
    );
}
