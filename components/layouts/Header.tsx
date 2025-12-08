// components/layouts/Header.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Code2, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useIntlayer } from "next-intlayer";
import { useState } from "react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { LocalizedLink } from "../LocalizedLink";
import { ThemeSwitcher } from "../ThemeSwitcher";

export function Header() {
    const { data: session } = useSession();
    const content = useIntlayer("header");
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const navLinks = (
        <>
            <LocalizedLink
                href="/"
                className="text-sm font-medium hover:underline"
                onClick={() => setIsSheetOpen(false)}
            >
                {content.home}
            </LocalizedLink>
            <LocalizedLink
                href="/projects"
                className="text-sm font-medium hover:underline"
                onClick={() => setIsSheetOpen(false)}
            >
                {content.projects}
            </LocalizedLink>
            <LocalizedLink
                href="/about"
                className="text-sm font-medium hover:underline"
                onClick={() => setIsSheetOpen(false)}
            >
                {content.about}
            </LocalizedLink>
            <LocalizedLink
                href="/contact"
                className="text-sm font-medium hover:underline"
                onClick={() => setIsSheetOpen(false)}
            >
                {content.contact}
            </LocalizedLink>
        </>
    );

    return (
        <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-50">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
                <LocalizedLink href="/">
                    <Code2 className="h-6 w-6 text-primary" />
                </LocalizedLink>
                {navLinks}
            </nav>

            <div className="hidden md:flex items-center gap-4">
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

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center justify-between w-full">
                <LocalizedLink href="/">
                    <Code2 className="h-6 w-6 text-primary" />
                </LocalizedLink>
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs">
                        <SheetHeader>
                            <SheetTitle>
                                <LocalizedLink
                                    href="/"
                                    onClick={() => setIsSheetOpen(false)}
                                >
                                    <Code2 className="h-6 w-6 text-primary" />
                                </LocalizedLink>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col h-full py-8">
                            <nav className="flex flex-col gap-6 text-lg">
                                {navLinks}
                            </nav>

                            <div className="mt-auto space-y-6">
                                <div className="flex flex-col gap-4">
                                    {session ? (
                                        <>
                                            <LocalizedLink
                                                href="/admin"
                                                className="text-sm text-muted-foreground hover:underline"
                                                onClick={() =>
                                                    setIsSheetOpen(false)
                                                }
                                            >
                                                {session.user?.email}
                                            </LocalizedLink>
                                            <Button
                                                variant="outline"
                                                onClick={() => signOut()}
                                            >
                                                {content.logout}
                                            </Button>
                                        </>
                                    ) : (
                                        <Button asChild>
                                            <LocalizedLink
                                                href="/login"
                                                onClick={() =>
                                                    setIsSheetOpen(false)
                                                }
                                            >
                                                {content.login}
                                            </LocalizedLink>
                                        </Button>
                                    )}
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="w-full">
                                        <LanguageSwitcher />
                                    </div>
                                    <ThemeSwitcher />
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
