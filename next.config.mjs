/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["pdf-parse"],
    experimental: {
        appDir: true,
      },
    generateRobotsTxt: true,
    siteUrl: "https://kulfi-ai.com",
};

export default nextConfig;