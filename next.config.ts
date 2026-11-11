import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Yuqori papkada boshqa loyihaning lockfile'i bor — ildiz shu loyiha ekanini aniq ko'rsatamiz
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
