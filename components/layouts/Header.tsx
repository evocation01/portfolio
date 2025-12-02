// components/layouts/Header.tsx
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
// Note: Ensure you have these components created or replace with standard HTML/Shadcn
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
// Assuming LocalizedLink and LanguageSwitcher are created in your project structure
// import { LocalizedLink } from "../LocalizedLink";
// import { LanguageSwitcher } from "../LanguageSwitcher";

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="flex items-center justify-between p-4 border-b bg-background">
            <nav className="flex items-center gap-4">
                <Link href="/" className="text-sm font-medium hover:underline">
                    Home
                </Link>
                <Link
                    href="/projects"
                    className="text-sm font-medium hover:underline"
                >
                    Projects
                </Link>
            </nav>
            <div className="flex items-center gap-4">
                {session ? (
                    <>
                        <span className="text-sm text-muted-foreground">
                            {session.user?.email}
                        </span>
                        <Button variant="outline" onClick={() => signOut()}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button onClick={() => signIn()}>Login</Button>
                )}
                {/* <LanguageSwitcher /> */}
                <ThemeSwitcher />
            </div>
        </header>
    );
}
