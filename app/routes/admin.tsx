/* eslint-disable tailwindcss/no-custom-classname */
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import {
  ButtonNavLink,
  buttonVariants,
  Logo,
  RemixNavLink,
  ThemeToggleButton,
} from "~/components";
import { configAdmin } from "~/configs";
import { cn, createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  return json({});
}

export default function AdminRoute() {
  return (
    <div data-id="admin-layout-route" className="flex">
      <AdminSidebar />

      <div data-id="admin-layout-outlet" className="grow">
        <Outlet />
      </div>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside className="card flex min-h-screen min-w-fit flex-col space-y-4">
      <div className="stack-h-center">
        <RemixNavLink
          to="/admin"
          prefetch="intent"
          className="transition-opacity hover:opacity-80"
        >
          <Logo />
        </RemixNavLink>
        <ThemeToggleButton size="sm" />
      </div>

      <ul className="grow space-y-1">
        {configAdmin.navigationItems.map(({ name, to }) => {
          return (
            <li key={name}>
              <RemixNavLink
                key={name}
                to={to}
                prefetch="intent"
                className={({ isActive }) =>
                  cn(
                    "inline-flex w-full gap-2 p-2",
                    buttonVariants({
                      variant: "navlink",
                      radius: "default",
                      weight: "default",
                      size: "sm",
                      align: "left",
                      isActive,
                    })
                  )
                }
                end
              >
                {name}
              </RemixNavLink>
            </li>
          );
        })}
      </ul>
      <div className="stack-v-center">
        <ButtonNavLink size="sm" variant="ghost" to="/">
          Go to site
        </ButtonNavLink>
      </div>
    </aside>
  );
}
