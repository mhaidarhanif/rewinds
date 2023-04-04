import { Layout, PageHeader } from "~/components";
import { cn, createMetaData, createSitemap } from "~/utils";

export const meta = createMetaData({
  title: "Page",
  description: "Some page description to replace.",
});

export const handle = createSitemap("/page", 0.9);

export default function Route() {
  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader>
          <h1>Blank Page</h1>
          <p>Just a minimal page layout and content to start with.</p>
        </PageHeader>
      }
    >
      <section className={cn("prose-config")}>
        <p>Change something here.</p>
        <p>Copy this file to create a new route.</p>
      </section>
    </Layout>
  );
}
