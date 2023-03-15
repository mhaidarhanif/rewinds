import { configMeta } from "~/configs/site";

import type { SEOHandle } from "@balavishnuvj/remix-seo";

export const createDocumentLinks = ({
  canonicalPath = configMeta?.canonicalPath,
  url = configMeta?.url,
}: {
  canonicalPath?: string;
  url?: string;
} = configMeta) => {
  return [
    {
      rel: "canonical",
      href: canonicalPath ? `${configMeta?.url}${canonicalPath}` : url,
    },
  ];
};

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
