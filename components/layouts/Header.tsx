// components/layouts/Header.tsx
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
// Note: Ensure you have these components created or replace with standard HTML/Shadcn
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { LocalizedLink } from "../LocalizedLink"; // Now imported
import { Code2 } from "lucide-react"; // For the new icon

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="flex items-center justify-between p-4 border-b bg-background">
            <nav className="flex items-center gap-4">
                <Code2 className="h-6 w-6 text-primary" /> {/* New Icon */}
                <LocalizedLink
                    href="/"
                    className="text-sm font-medium hover:underline"
                >
                    Home
                </LocalizedLink>
                <LocalizedLink
                    href="/projects"
                    className="text-sm font-medium hover:underline"
                >
                    Projects
                </LocalizedLink>
                <LocalizedLink
                    href="/about"
                    className="text-sm font-medium hover:underline"
                >
                    About
                </LocalizedLink>
                <LocalizedLink
                    href="/contact"
                    className="text-sm font-medium hover:underline"
                >
                    Contact
                </LocalizedLink>
            </nav>
            <div className="flex items-center gap-4">
                {session ? (
                    <>
                        <LocalizedLink
                            href="/admin"
                            className="text-sm text-muted-foreground hover:underline"
                        >
                            {session.user?.email}
                        </LocalizedLink>
                        <Button variant="outline" onClick={() => signOut()}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button onClick={() => signIn()}>Login</Button>
                )}
                <LanguageSwitcher /> {/* Uncommented */}
                <ThemeSwitcher />
            </div>
        </header>
    );
}
