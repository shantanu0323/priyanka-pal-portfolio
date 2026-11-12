import type { NextConfig } from "next";

// Derived from the GitHub repo name in CI; "<user>.github.io" repos are served from the root.
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "priyanka-pal-portfolio";
const isUserSite = repoName.endsWith(".github.io");
// The repo subpath is only needed on GitHub Pages; custom-domain hosts (e.g. Cloudflare Pages) serve from the root.
const isProd = process.env.NODE_ENV === "production" && process.env.GITHUB_ACTIONS === "true";

const lessLoader = {
  loader: "less-loader",
  options: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
};

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd && !isUserSite ? `/${repoName}` : "",
  assetPrefix: isProd && !isUserSite ? `/${repoName}/` : "/",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd && !isUserSite ? `/${repoName}` : "",
  },
  turbopack: {
    rules: {
      "*.module.less": {
        loaders: [lessLoader],
        as: "*.module.css",
      },
      "*.less": {
        condition: { not: { path: /\.module\.less$/ } },
        loaders: [lessLoader],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
