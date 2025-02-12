import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        SERVER_ADDRESS: process.env.SERVER_ADDRESS,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `**`
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
