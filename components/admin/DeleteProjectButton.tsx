"use client";

import { deleteProject } from "@/app/actions/deleteProject";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useActionState } from "react";
import { toast } from "sonner";

// Define the expected state type that the action can return
type DeleteActionState = {
    message?: string;
    error?: string;
    success?: boolean;
};

export function DeleteProjectButton({ projectId }: { projectId: number }) {
    // useActionState to get state from the server action
    const [state, formAction, isPending] = useActionState<
        DeleteActionState, // Type of the state
        FormData           // Type of the payload
    >(
        deleteProject, // The action function itself
        {
            // Explicit initial state
            message: undefined,
            error: undefined,
            success: undefined,
        }
    );

    // Show toast notifications based on the action's state
    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
        }
        if (state.error) {
            toast.error(state.error);
        }
    }, [state]); // Re-run effect when state changes

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Only prevent default if the user cancels the confirmation
        if (!confirm("Are you sure you want to delete this project?")) {
            event.preventDefault();
        }
        // If confirmed, the form will submit normally,
        // calling formAction automatically with the FormData.
    };

    return (
        <form action={formAction} onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={projectId} />
            <Button
                variant="destructive"
                size="sm"
                type="submit"
                disabled={isPending}
                className="h-8"
            >
                <Trash2 className="h-3 w-3 mr-1" />
                {isPending ? "Deleting..." : "Delete"}
            </Button>
        </form>
    );
}
