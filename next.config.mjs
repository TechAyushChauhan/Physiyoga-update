/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['png.pngtree.com', 'a.storyblok.com'], // Allow images from both external domains
  },
  experimental: {
    // Optional: Enable appDir or any other experimental features you need
    appDir: true,
  },
  webpack(config) {
    // Optional: Customize webpack configurations, for example adding support for SVG or other loaders
    return config;
  },
};

export default nextConfig;
