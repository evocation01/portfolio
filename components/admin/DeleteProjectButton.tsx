"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function DeleteButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            variant="destructive"
            size="sm"
            type="submit"
            disabled={pending}
            className="h-8"
        >
            <Trash2 className="h-3 w-3 mr-1" />
            {pending ? "Deleting..." : "Delete"}
        </Button>
    );
}

export function DeleteProjectButton({
    projectId,
    serverAction,
}: {
    projectId: number;
    serverAction: (formData: FormData) => void;
}) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!confirm("Are you sure you want to delete this project?")) {
            event.preventDefault();
        }
    };

    return (
        <form action={serverAction} onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={projectId} />
            <DeleteButton />
        </form>
    );
}
