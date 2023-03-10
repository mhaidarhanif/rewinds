import { AnchorText, Layout, MusicPlayer, PageHeader } from "~/components";
import { createDocumentLinks, createMetaData, createSitemap } from "~/utils";

import type { LinksFunction } from "@remix-run/node";

export const meta = createMetaData({
  title: "Demo",
  description: "Complex demo to showcase the components usage.",
});

export const handle = createSitemap("/demo", 0.9);

export const links: LinksFunction = () => {
  return createDocumentLinks({ canonicalPath: "/examples" });
};

export default function DemoRoute() {
  return (
    <Layout
      isSpaced
      pageHeader={
        <PageHeader>
          <h2>Demo</h2>
          <p>Complex showcase, more than just component examples.</p>
        </PageHeader>
      }
    >
      <section className="space-y-4">
        <header>
          <h2>Music Player</h2>
          <p>
            Demo from{" "}
            <AnchorText href="https://ui.shadcn.com">shadcn/ui</AnchorText>{" "}
            landing page. Just beware, this example wouldn't work on mobile yet.
          </p>
        </header>
        <MusicPlayer />
      </section>
    </Layout>
  );
}
