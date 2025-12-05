import type { Config } from "tailwindcss";

const config: Config = {
    theme: {
        extend: {
            colors: {
                "primary-dark": "#0f172a",
                "accent-teal": "#14b8a6",
                "dracula-background": "#282a36",
                "dracula-foreground": "#f8f8f2",
                "dracula-comment": "#6272a4",
                "dracula-purple": "#bd93f9",
                "dracula-pink": "#ff79c6",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;
