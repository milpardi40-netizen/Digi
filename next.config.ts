import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGhPages
    ? {
        output: "export",
        basePath: "/Digi",
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {
        allowedDevOrigins: ["*.e2b.app", "3000-*.e2b.app"],
      }),
};

export default nextConfig;
