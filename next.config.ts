import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // Ensures routes build as /services/index.html instead of services.html
};

export default nextConfig;
