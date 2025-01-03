/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['png.pngtree.com', 'a.storyblok.com'], // Allow images from both external domains
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  
};
export default nextConfig;
