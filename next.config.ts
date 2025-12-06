import fs from "fs/promises";
import { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";
import path from "path";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                hostname: "fbtruh896ye6fyjd.public.blob.vercel-storage.com",
                protocol: "https",
                port: "",
                pathname: "/**",
            },
        ],
    },
    async rewrites() {
        try {
            const rewritesFile = await fs.readFile(
                path.resolve("rewrites.json"),
                "utf-8"
            );
            return JSON.parse(rewritesFile);
        } catch (error) {
            console.warn(
                "Could not load rewrites.json, continuing without rewrites."
            );
            return [];
        }
    },
};

export default withIntlayer(nextConfig);
