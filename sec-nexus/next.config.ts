import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.utfs.io',
        port: '',
        // pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.ufs.sh',
        port: '',
        // pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'zyn7okgp66.ufs.sh',
        port: '',
        // pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
        port: '',
        // pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        // pathname: '/**',
      },
    ],
  }
  /* config options here */
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: false, // Enable PWA in development for testing
  },
});
