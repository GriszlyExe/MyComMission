import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        SERVER_ADDR: process.env.SERVER_ADDR,
    }
};

export default nextConfig;
