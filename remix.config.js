// to determine if we're on the local development server
const isDevelopment = process.env.NODE_ENV === "development";

// to enable or disable HMR/HDR
const isUsingHMR = Boolean(process.env.USE_HMR) || false;

// to show environent condition
console.info({
  message: `⏪ Rewinds is running`,
  NODE_ENV: process.env.NODE_ENV,
  USE_HMR: process.env.USE_HMR,
  isUsingHMR,
});

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",

  // change this if you are not using Vercel
  server: isDevelopment ? undefined : "./server-vercel.js",
  serverBuildPath:
    isUsingHMR && isDevelopment ? "build/index.js" : "api/index.js",

  // https://remix.run/docs/en/1.14.3/file-conventions/remix-config#serverdependenciestobundle
  serverDependenciesToBundle: [],

  // https://remix.run/docs/en/v1/file-conventions/route-files-v2#route-file-naming-v2
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_routeConvention: true,
    v2_normalizeFormMethod: true,
    unstable_tailwind: true,
    unstable_postcss: true,
    unstable_dev: isUsingHMR,
  },
};
