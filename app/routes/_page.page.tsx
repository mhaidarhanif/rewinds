import { Layout, PageHeader } from "~/components";
import { createSitemap } from "~/utils";

export const handle = createSitemap();

export default function PageRoute() {
  return (
    <Layout
      isSpaced
      pageHeader={
        <PageHeader>
          <h2>Blank Page</h2>
          <p>Just a minimal page layout and content to start with.</p>
        </PageHeader>
      }
    >
      <p>Change something here.</p>
    </Layout>
  );
}
