"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from "@/lib/actions";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { useActionState, useState, useTransition } from "react";

export default function ContactPageClient() {
    const content = useIntlayer("contact");
    const [isPending, startTransition] = useTransition();
    const [state, formAction] = useActionState(sendContactEmail, {
        message: "",
        errors: {},
        success: false,
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataObj.append(key, value);
        });
        startTransition(() => {
            formAction(formDataObj);
            // Optionally clear form after successful submission if needed in the state handler
            if (state.success) {
                setFormData({ name: "", email: "", subject: "", message: "" });
            }
        });
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-10">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-center">
                        {content.title}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {content.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {state.success ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-8">
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                            <p className="text-lg font-semibold text-center">
                                {content.successMessage}
                            </p>
                            <p className="text-sm text-muted-foreground text-center">
                                {content.successDescription}
                            </p>
                            <Button onClick={() => window.location.reload()}>
                                {content.sendAnother}
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    {content.nameLabel}
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder={content.namePlaceholder.value}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                {state.errors?.name && (
                                    <p className="text-sm text-destructive">
                                        {state.errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    {content.emailLabel}
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={content.emailPlaceholder.value}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                {state.errors?.email && (
                                    <p className="text-sm text-destructive">
                                        {state.errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subject">
                                    {content.subjectLabel}
                                </Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder={
                                        content.subjectPlaceholder.value
                                    }
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                                {state.errors?.subject && (
                                    <p className="text-sm text-destructive">
                                        {state.errors.subject}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">
                                    {content.messageLabel}
                                </Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder={
                                        content.messagePlaceholder.value
                                    }
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                />
                                {state.errors?.message && (
                                    <p className="text-sm text-destructive">
                                        {state.errors.message}
                                    </p>
                                )}
                            </div>
                            {state.message && !state.success && (
                                <p className="text-sm text-red-500 text-center">
                                    {state.message}
                                </p>
                            )}
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {content.sendingButton}
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        {content.sendButton}
                                    </>
                                )}
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        {String(content.emailFooter.value).replace(
                            "{emailLink}",
                            " "
                        )}
                        <a
                            href="mailto:contact@hakanispir.dev"
                            className="underline"
                        >
                            contact@hakanispir.dev
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
