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
  redirects() {
    return [
      {
        destination: "/uses",
        permanent: true,
        source: "/stack",
      },
    ];
  },
};

const withContent = await createContent();

export default withContent(nextConfig);
