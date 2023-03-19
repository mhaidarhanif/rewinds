import { json } from "@remix-run/node";

import { AnchorText, Layout, PageHeader } from "~/components";
import { configMeta } from "~/configs";
import { createMetaData, createSitemap } from "~/utils";

export const handle = createSitemap();

export const loader = () => {
  return json(null, { status: 404 });
};

export const meta = createMetaData({
  title: "Page Not Found",
  description: "There is nothing here.",
});

export default function SplatRoute() {
  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="sm">
          <h2>Oops, Error 404: Page Not Found</h2>
          <p>Sorry, this page is not available..</p>
        </PageHeader>
      }
    >
      <p>
        You might want to inform{" "}
        <AnchorText href={configMeta.author.url}>
          {configMeta.author.name}
        </AnchorText>
        .
      </p>
    </Layout>
  );
}
