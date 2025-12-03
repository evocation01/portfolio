import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                hostname: 'fbtruh896ye6fyjd.public.blob.vercel-storage.com',
                protocol: 'https',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default withIntlayer(nextConfig);
