import { Layout, PageHeader } from "~/components";
import { adminNoteModel } from "~/models";

import type { SEOHandle } from "~/utils";

/**
 * Generate sitemap for blog route and the articles.
 */
export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const articles = await adminNoteModel.getAllNotes();
    const articleEntries: any = articles.map((article) => {
      return { route: `/blog/${article.id}`, priority: 0.8 };
    });

    return [{ route: `/blog`, priority: 0.8 }, ...articleEntries];
  },
};

export default function BlogRoute() {
  return (
    <Layout
      isSpaced
      layoutHeader={
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
