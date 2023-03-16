import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { ButtonNavLink, Logo, RemixLink, RemixNavLink } from "~/components";
import { configAdmin } from "~/configs";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  return json({});
}

export default function AdminRoute() {
  return (
    <div data-id="admin-layout-route" className="flex">
      <aside className="card min-h-screen min-w-fit space-y-4">
        <RemixNavLink
          to="/admin"
          prefetch="intent"
          className="transition-opacity hover:opacity-80"
        >
          <Logo />
        </RemixNavLink>
        <ul className="space-y-1">
          {configAdmin.navigationItems.map(({ name, to }) => {
            return (
              <li key={name}>
                <ButtonNavLink align="left" size="sm" variant="navlink" to={to}>
                  {name}
                </ButtonNavLink>
              </li>
            );
          })}
        </ul>
      </aside>

      <div data-id="admin-layout-outlet" className="grow p-2">
        <Outlet />
      </div>
    </div>
  );
}
