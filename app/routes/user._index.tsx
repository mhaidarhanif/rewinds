import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { ButtonLink, RemixLink } from "~/components";
import { userModel } from "~/models";
import { authenticator } from "~/services";
import { cn, createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  invariant(userSession);

  const user = await userModel.getUserById({ id: userSession.id });
  invariant(user, "User not found");

  const metrics = await userModel.getMetrics({ id: userSession.id });
  invariant(metrics, "User metrics not available");

  return json({ user, metrics });
}

export default function UserIndexRoute() {
  const { user, metrics } = useLoaderData<typeof loader>();
  const isAdmin = user.role.symbol === "ADMIN";

  return (
    <div data-id="user-index" className="space-y-4">
      <section>
        <h2>{user.name}</h2>
        <p>{user.profile.bio}</p>
      </section>

      <section>
        <ul className="grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {metrics.map((metric) => {
            return (
              <RemixLink key={metric.name} to={metric.to}>
                <li className={cn("card", "flex flex-col p-4 text-center")}>
                  <h3 className="text-4xl font-extrabold">{metric.count}</h3>
                  <span className="mt-2 text-sm">{metric.name}</span>
                </li>
              </RemixLink>
            );
          })}
        </ul>
      </section>

      <section>
        <div className="stack-h-center">
          <ButtonLink variant="danger" size="sm" to="/logout">
            Log out
          </ButtonLink>
          {isAdmin && (
            <ButtonLink variant="info" size="sm" to="/admin">
              Admin
            </ButtonLink>
          )}
        </div>
      </section>
    </div>
  );
}
