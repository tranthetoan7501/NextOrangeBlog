/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "media.fmplus.com.vn",
      "localhost",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.fmplus.com.vn",
        port: "",
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
