import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug, PageAdminHeader } from "~/components";
import { requireUserSession } from "~/helpers";
import { useRootLoaderData } from "~/hooks";
import { model } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const { userSession, user } = await requireUserSession(request);

  const metrics = await model.admin.query.getMetrics();

  return json({ userSession, user, metrics });
}

export default function AdminIndexRoute() {
  const rootLoaderData = useRootLoaderData();
  const loaderData = useLoaderData<typeof loader>();

  const { user } = loaderData;

  return (
    <div data-id="admin-index" className="stack-v">
      <PageAdminHeader size="xs">
        <h1>Admin Dashboard</h1>
      </PageAdminHeader>

      <section className="px-layout space-y-2">
        <h2>Welcome, {user.name}!</h2>
        <h3>Your role is {user.role.name}</h3>
      </section>

      <div className="px-layout space-y-2">
        <Debug name="rootLoaderData">{rootLoaderData}</Debug>
        <Debug name="loaderData">{loaderData}</Debug>
      </div>
    </div>
  );
}
