// components/layouts/Providers.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    // Ensure QueryClient is created once per client lifecycle
    const [queryClient] = useState(() => new QueryClient());

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
