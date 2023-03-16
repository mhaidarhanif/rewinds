import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug, PageHeader } from "~/components";
import { useRootLoaderData } from "~/hooks";
import { admin } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const metrics = await admin.getAllDataMetrics();

  return json({ metrics });
}

export default function AdminIndexRoute() {
  const { ENV, theme } = useRootLoaderData();
  const { metrics } = useLoaderData<typeof loader>();

  return (
    <div data-id="admin-index">
      <PageHeader size="sm">
        <h2>Admin Dashboard</h2>
        <p>Index content</p>
      </PageHeader>

      <div className="stack-v">
        <Debug name="ENV">{ENV}</Debug>
        <Debug name="theme">{theme}</Debug>
        <Debug name="metrics">{metrics}</Debug>
      </div>
    </div>
  );
}
