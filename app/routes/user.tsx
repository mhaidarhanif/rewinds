import { Outlet } from "@remix-run/react";

import { Layout } from "~/components";
import { authorizeUser } from "~/helpers";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  await authorizeUser(request);
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
