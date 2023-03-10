/** @type {import('@remix-run/dev').AppConfig} */

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  ignoredRouteFiles: ["**/.*"],

  server: isDevelopment ? undefined : "./server-vercel.js",
  serverBuildPath: isDevelopment ? "build/index.js" : "api/index.js",
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",

  // https://remix.run/docs/en/v1/file-conventions/route-files-v2#route-file-naming-v2
  future: {
    v2_routeConvention: true,
    v2_meta: true,
    unstable_dev: true,
    unstable_postcss: true,
    unstable_tailwind: true,
  },
};
