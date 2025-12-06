// app/[locale]/login/client-page.tsx
"use client";

import { LocalizedLink } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useIntlayer } from "next-intlayer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPageClient() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const content = useIntlayer("login");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            // Redirect to admin or a default authenticated page
            router.push("/admin");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        {content.title}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {content.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">{content.emailLabel}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={content.emailPlaceholder.value}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">
                                {content.passwordLabel}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}
                        <Button className="w-full" type="submit">
                            {content.loginButton}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button variant="link" size="sm" asChild>
                        <LocalizedLink href="/">
                            {content.backToHomepage}
                        </LocalizedLink>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
