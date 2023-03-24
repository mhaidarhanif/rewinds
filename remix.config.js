const isDevelopment = process.env.NODE_ENV === "development";

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  sourceMap: true,

  // change this if you are not using Vercel
  server: isDevelopment ? undefined : "./server-vercel.js",
  serverBuildPath: isDevelopment ? "build/index.js" : "api/index.js",

  // https://remix.run/docs/en/1.14.3/file-conventions/remix-config#serverdependenciestobundle
  serverDependenciesToBundle: [],

  // https://remix.run/docs/en/v1/file-conventions/route-files-v2#route-file-naming-v2
  future: {
    v2_routeConvention: true,
    v2_meta: true,
    unstable_dev: true, // change to false or remove this to disable HMR/HDR
    unstable_postcss: true,
    unstable_tailwind: true,
  },
};
