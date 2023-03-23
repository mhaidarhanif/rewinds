import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { ButtonLink, PageHeader, RemixLink, RemixLinkText } from "~/components";
import { requireUserRole, requireUserSession } from "~/helpers";
import { model } from "~/models";
import { cn, createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const { userSession, user } = await requireUserSession(request);

  const metrics = await model.user.query.getMetrics({ id: userSession.id });
  invariant(metrics, "User metrics not available");

  return json({ user, metrics });
}

export default function UserDashboardRoute() {
  const { user, metrics } = useLoaderData<typeof loader>();
  const isAllowed = requireUserRole(user, ["ADMIN", "MANAGER", "EDITOR"]);

  return (
    <div data-id="user-dashboard" className="space-y-4">
      <PageHeader size="xs" withBackground={false} withContainer={false}>
        <h1>Dashboard</h1>
      </PageHeader>

      <section className="space-y-2">
        <h2>Welcome, {user.name}!</h2>
        <h3>
          <span>Dashboard for </span>
          <RemixLinkText to={`/${user.username}`}>
            @{user.username}
          </RemixLinkText>
        </h3>
      </section>

      <section>
        <ul className="grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {metrics.map((metric) => {
            return (
              <li key={metric.id}>
                <RemixLink
                  to={`/user/${metric.slug}`}
                  className={cn(
                    "card hover:card-hover",
                    "flex flex-col text-center"
                  )}
                >
                  <h3 className="text-4xl font-extrabold">{metric.count}</h3>
                  <span className="mt-2 text-sm">{metric.name}</span>
                </RemixLink>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <div className="stack-h-center">
          <ButtonLink variant="danger" size="sm" to="/logout">
            Log out
          </ButtonLink>
          {isAllowed && (
            <ButtonLink variant="info" size="sm" to="/admin">
              Admin
            </ButtonLink>
          )}
        </div>
      </section>
    </div>
  );
}
