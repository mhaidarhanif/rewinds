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
  const rootLoaderData = useRootLoaderData();
  const { metrics } = useLoaderData<typeof loader>();

  return (
    <div data-id="admin-index">
      <PageHeader size="xs">
        <div className="stack-h-center">
          <h1>Admin Dashboard</h1>
        </div>
      </PageHeader>

      <div className="stack-v">
        <Debug name="metrics">{metrics}</Debug>
        <Debug name="rootLoaderData">{rootLoaderData}</Debug>
      </div>
    </div>
  );
}
