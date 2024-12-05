/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: "https://costockco.com/api/:path*/",
      },
    ];
  },
  trailingSlash: true,
};

export default nextConfig;
