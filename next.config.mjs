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
    ],
  },
};

export default nextConfig;
