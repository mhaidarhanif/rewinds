import { Layout, PageHeader, TableExample } from "~/components";

/**
 * Demo: Table
 */

export default function Route() {
  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="sm" isTextCentered>
          <h1>Demo: Uploadcare</h1>
        </PageHeader>
      }
    >
      <TableExample />
    </Layout>
  );
}
