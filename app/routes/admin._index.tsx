import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug, PageAdminHeader } from "~/components";
import { authorizeUser } from "~/helpers";
import { useRootLoaderData } from "~/hooks";
import { admin } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const { user } = await authorizeUser(request);

  const metrics = await admin.getMetrics();

  return json({ user, metrics });
}

export default function AdminIndexRoute() {
  const rootLoaderData = useRootLoaderData();
  const { metrics } = useLoaderData<typeof loader>();

  return (
    <div data-id="admin-index">
      <PageAdminHeader size="xs">
        <h1>Admin Dashboard</h1>
      </PageAdminHeader>

      <div className="stack-v">
        <Debug name="metrics">{metrics}</Debug>
        <Debug name="rootLoaderData">{rootLoaderData}</Debug>
      </div>
    </div>
  );
}
