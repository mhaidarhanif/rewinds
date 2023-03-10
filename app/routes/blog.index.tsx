import { Layout, PageHeader } from "~/components";
import { getNoteListItems } from "~/models";

import type { SEOHandle } from "~/utils";

/**
 * Generate sitemap for blog route and the articles.
 */
export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const articles: any = await getNoteListItems({ userId: "" });
    const articleEntries = articles.map((article: any) => {
      return { route: `/blog/${article.id}`, priority: 0.8 };
    });

    return [{ route: `/blog`, priority: 0.8 }, ...articleEntries];
  },
};

export default function BlogRoute() {
  return (
    <Layout
      isSpaced
      pageHeader={
        <PageHeader>
          <h1>Blog</h1>
          <p>Quality articles for you.</p>
        </PageHeader>
      }
    >
      <p>Change something here.</p>
    </Layout>
  );
}
