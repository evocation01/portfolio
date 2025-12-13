"use client";

import { useTheme } from "next-themes";
import Script from "next/script";
import { useEffect, useState } from "react";

// Add type declaration for window.Contra
declare global {
    interface Window {
        Contra?: {
            init: () => void;
        };
    }
}

export function ContraButton() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // We need to ensure the component is mounted on the client before rendering
    // because the theme is only available on the client.
    if (!mounted) {
        return null;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <>
            <div
                key={isDark ? "dark" : "light"} // Add key to force re-render on theme change
                className="contra-hire-me-button"
                data-analyticsuserid="35a8bda6-c8d8-48ee-b9db-c0879c78bccc"
                data-theme={isDark ? "light" : "dark"}
                data-username="hakanispir"
            ></div>

            <Script
                id="contra-sdk"
                src="https://contra.com/static/embed/sdk.js"
                strategy="lazyOnload"
                onLoad={() => {
                    // Re-initialize the Contra widget if it exists on the window object
                    // This is sometimes necessary for scripts that don't automatically
                    // detect DOM changes.
                    if (window.Contra && typeof window.Contra.init === 'function') {
                        window.Contra.init();
                    }
                }}
            />
        </>
    );
}
