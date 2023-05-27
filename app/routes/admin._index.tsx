import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Badge, Debug, PageAdminHeader, RemixLink } from "~/components";
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

  const { user, metrics } = loaderData;

  return (
    <div>
      <PageAdminHeader size="xs">
        <h1>Admin Dashboard</h1>
        <RemixLink to={`/admin/users/${user.id}`}>
          <div className="space-y-2 text-right">
            <h2>Welcome, {user.name}!</h2>
            <Badge>{user.role.name}</Badge>
          </div>
        </RemixLink>
      </PageAdminHeader>

      <section className="px-layout space-y-2">
        <h3>Database Metrics/Statistics</h3>
        <div className="grid max-w-3xl gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {metrics.map((metric) => {
            return (
              <RemixLink key={metric.name} to={metric.to}>
                <div className="card hover:card-hover stack rounded p-4 text-center">
                  <p className="text-6xl font-extrabold">{metric.count}</p>
                  <span>{metric.name}</span>
                </div>
              </RemixLink>
            );
          })}
        </div>
      </section>

      <section className="px-layout">
        <Debug name="rootLoaderData">{rootLoaderData}</Debug>
        <Debug name="loaderData">{loaderData}</Debug>
      </section>
    </div>
  );
}
