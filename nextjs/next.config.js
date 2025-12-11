/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for production deployment
  output: 'standalone', // Creates a minimal server for easier deployment
  images: {
    // allow serving uploaded images from the same origin
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
};

module.exports = nextConfig;
