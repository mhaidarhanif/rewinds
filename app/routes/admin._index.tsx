import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug, PageAdminHeader } from "~/components";
import { useRootLoaderData } from "~/hooks";
import { admin } from "~/models";
import { authenticator } from "~/services";
import { createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  invariant(userSession);

  const metrics = await admin.getMetrics();

  return json({ metrics });
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
