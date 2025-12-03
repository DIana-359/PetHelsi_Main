import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "ec2-51-21-247-49.eu-north-1.compute.amazonaws.com",
        pathname: "/avatars/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/avatars/**",
      },
    ],
  },
};

export default nextConfig;
