/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // You don't need to set bodySizeLimit under serverActions for this case
  },
  api: {
    bodyParser: {
      sizeLimit: '700mb', // Set the body size limit for API requests
    },
  },
  images: {
    domains: ['png.pngtree.com'], // Allow images from the specified external domain
  },
};

export default nextConfig;
