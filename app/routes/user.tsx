import { Outlet } from "@remix-run/react";

import { Layout } from "~/components";
import { requireUserSession } from "~/helpers";
import { createSitemap } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  await requireUserSession(request);
  return null;
}

export async function action({ request }: ActionArgs) {
  await requireUserSession(request);
  return null;
}

export default function Route() {
  return (
    <Layout isSpaced>
      <div data-id="user-layout-outlet" className="grow">
        <Outlet />
      </div>
    </Layout>
  );
}
