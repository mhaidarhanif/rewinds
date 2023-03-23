import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug, PageAdminHeader } from "~/components";
import { requireUserSession } from "~/helpers";
import { useRootLoaderData } from "~/hooks";
import { admin } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const { userSession, user } = await requireUserSession(request);

  const metrics = await admin.getMetrics();

  return json({ userSession, user, metrics });
}

export default function AdminIndexRoute() {
  const rootLoaderData = useRootLoaderData();
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div data-id="admin-index">
      <PageAdminHeader size="xs">
        <h1>Admin Dashboard</h1>
      </PageAdminHeader>

      <div className="stack-v px-layout">
        <Debug name="rootLoaderData">{rootLoaderData}</Debug>
        <Debug name="loaderData">{loaderData}</Debug>
      </div>
    </div>
  );
}
