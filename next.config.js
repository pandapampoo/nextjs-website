const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      }
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  }
};

module.exports = nextConfig;
