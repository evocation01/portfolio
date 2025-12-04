import type { Config } from "tailwindcss";

const config: Config = {
    theme: {
        extend: {
            colors: {
                "primary-dark": "#0f172a", // Slate-900 for dark mode background
                "accent-teal": "#14b8a6", // Teal-500 for buttons/links
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;
