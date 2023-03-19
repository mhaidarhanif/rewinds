import { Outlet } from "@remix-run/react";

import { Layout, PageHeader } from "~/components";
import { authenticator } from "~/services";
import { createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  invariant(userSession);

  return null;
}

export default function UserLayoutRoute() {
  return (
    <Layout isSpaced>
      <div data-id="user-layout-outlet" className="grow">
        <Outlet />
      </div>
    </Layout>
  );
}
