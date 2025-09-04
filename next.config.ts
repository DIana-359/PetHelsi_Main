import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://om6auk3tigy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "om6auk3tigy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws",
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
