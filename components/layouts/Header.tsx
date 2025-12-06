// components/layouts/Header.tsx
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { LocalizedLink } from "../LocalizedLink";
import { Code2 } from "lucide-react";
import { useIntlayer } from "next-intlayer";

export function Header() {
    const { data: session } = useSession();
    const content = useIntlayer("header");

    return (
        <header className="flex items-center justify-between p-4 border-b bg-background">
            <nav className="flex items-center gap-4">
                <LocalizedLink href="/">
                    <Code2 className="h-6 w-6 text-primary" />
                </LocalizedLink>
                <LocalizedLink
                    href="/"
                    className="text-sm font-medium hover:underline"
                >
                    {content.home}
                </LocalizedLink>
                <LocalizedLink
                    href="/projects"
                    className="text-sm font-medium hover:underline"
                >
                    {content.projects}
                </LocalizedLink>
                <LocalizedLink
                    href="/about"
                    className="text-sm font-medium hover:underline"
                >
                    {content.about}
                </LocalizedLink>
                <LocalizedLink
                    href="/contact"
                    className="text-sm font-medium hover:underline"
                >
                    {content.contact}
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
                            {content.logout}
                        </Button>
                    </>
                ) : (
                    <Button asChild>
                        <LocalizedLink href="/login">
                            {content.login}
                        </LocalizedLink>
                    </Button>
                )}
                <LanguageSwitcher />
                <ThemeSwitcher />
            </div>
        </header>
    );
}
