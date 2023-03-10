import type { SEOHandle } from "@balavishnuvj/remix-seo";

export function createSitemap(route?: string | null, priority?: number) {
  const entries = route ? [{ route, priority }] : null;
  const handle = {
    getSitemapEntries: async () => {
      return entries;
    },
  };
  return handle as SEOHandle;
}

export type { SEOHandle };
