/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
