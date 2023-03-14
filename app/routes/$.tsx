import { json } from "@remix-run/node";
import { Layout, PageHeader } from "~/components";

export const loader = () => {
  return json(null, { status: 404 });
};

export default function SplatRoute() {
  return (
    <Layout
      isSpaced
      pageHeader={
        <PageHeader size="sm">
          <h2>Oops, Error 404: Page Not Found</h2>
          <p>Sorry, this page is not available..</p>
        </PageHeader>
      }
    >
      <p>You might want to inform Rewinds.</p>
    </Layout>
  );
}
