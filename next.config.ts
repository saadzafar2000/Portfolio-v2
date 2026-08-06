import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "assets.vercel.com" },
      { protocol: "https", hostname: "www.netlify.com" },
      { protocol: "https", hostname: "img.icons8.com" },
    ],
  },
};

export default nextConfig;
