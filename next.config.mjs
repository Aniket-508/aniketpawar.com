import { createContent } from "fuma-content/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ik.imagekit.io",
        protocol: "https",
      },
      {
        hostname: "placehold.co",
        protocol: "https",
      },
      {
        hostname: "opengraph.githubassets.com",
        protocol: "https",
      },
      {
        hostname: "**.vercel.app",
        protocol: "https",
      },
    ],
  },
};

const withContent = await createContent();

export default withContent(nextConfig);
