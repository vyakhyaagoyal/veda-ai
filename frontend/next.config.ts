/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "veda-ai-production-39b3.up.railway.app",
      },

      {
        protocol: "https",
        hostname:
          "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;