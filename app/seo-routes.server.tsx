import { generateRobotsTxt, generateSitemap } from "@balavishnuvj/remix-seo";

import { configMeta } from "~/configs";

import type { EntryContext } from "@remix-run/node";

type Handler = (
  request: Request,
  remixContext: EntryContext
) => Promise<Response | null> | null;

export const seoRoutes: Record<string, Handler> = {
  "/sitemap.xml": async (request, remixContext) => {
    return generateSitemap(request, remixContext, {
      siteUrl: configMeta?.url,
      headers: {
        "Cache-Control": `public, max-age=${60}`,
      },
    });
  },
  "/robots.txt": async () => {
    return generateRobotsTxt([
      { type: "sitemap", value: `${configMeta?.url}/sitemap.xml` },
      { type: "disallow", value: "/admin" },
    ]);
  },
};

export const seoRouteHandlers: Array<Handler> = [
  ...Object.entries(seoRoutes).map(([path, handler]) => {
    return (request: Request, remixContext: EntryContext) => {
      if (new URL(request.url).pathname !== path) return null;
      return handler(request, remixContext);
    };
  }),
];
