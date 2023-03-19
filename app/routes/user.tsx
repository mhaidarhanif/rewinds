/* eslint-disable tailwindcss/no-custom-classname */
import { json } from "@remix-run/node";
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

  return json({});
}

export default function UserRoute() {
  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="xs">
          <h1>User Dashboard</h1>
        </PageHeader>
      }
    >
      <div data-id="user-layout-outlet" className="grow">
        <Outlet />
      </div>
    </Layout>
  );
}
