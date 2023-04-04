import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Badge, Debug, PageAdminHeader } from "~/components";
import { requireUserSession } from "~/helpers";
import { useRootLoaderData } from "~/hooks";
import { model } from "~/models";
import { createCacheHeaders, createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const { userSession, user } = await requireUserSession(request);

  const metrics = await model.admin.query.getMetrics();

  return json(
    { userSession, user, metrics },
    { headers: createCacheHeaders(request) }
  );
}

export default function Route() {
  const rootLoaderData = useRootLoaderData();
  const loaderData = useLoaderData<typeof loader>();

  const { user } = loaderData;

  return (
    <div className="stack">
      <PageAdminHeader size="xs">
        <h1>Admin Dashboard</h1>
      </PageAdminHeader>

      <section className="px-layout space-y-2">
        <h2>Welcome, {user.name}!</h2>
        <p>
          Your role is <Badge>{user.role.name}</Badge>
        </p>
      </section>

      <div className="px-layout space-y-2">
        <Debug name="rootLoaderData">{rootLoaderData}</Debug>
        <Debug name="loaderData">{loaderData}</Debug>
      </div>
    </div>
  );
}
