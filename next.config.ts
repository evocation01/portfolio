import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,

    async redirects() {
        return [
            {
                source: "/",
                destination: "/en",
                permanent: true,
            },
        ];
    },
};

export default withIntlayer(nextConfig);
