/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "veda-ai-production-39b3.up.railway.app",
      },
    ],
  },
};

export default nextConfig;