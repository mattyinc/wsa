import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/wsa" : "",
  assetPrefix: isProd ? "/wsa" : "",
};

export default nextConfig;
