import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}", // We will create this folder
    ],
    theme: {
        extend: {
            colors: {
                "primary-dark": "#0f172a", // Slate-900 for dark mode background
                "accent-teal": "#14b8a6", // Teal-500 for buttons/links
            },
        },
    },
    plugins: [],
};
export default config;
