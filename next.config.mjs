import { createContent } from "fuma-content/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ik.imagekit.io",
        protocol: "https",
      },
    ],
  },
};

const withContent = await createContent();

export default withContent(nextConfig);
