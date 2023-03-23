import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import {
  ButtonNavLink,
  buttonVariants,
  HeaderUserMenu,
  Logo,
  RemixNavLink,
  ThemeToggleButton,
} from "~/components";
import { configAdmin } from "~/configs";
import { requireUserSession } from "~/helpers";
import { cn, createSitemap } from "~/utils";

import type { LoaderArgs, ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const { isAllowed } = await requireUserSession(request, [
    "ADMIN",
    "MANAGER",
    "EDITOR",
  ]);
  if (!isAllowed) {
    return redirect(`/`);
  }
  return null;
}

export async function action({ request }: ActionArgs) {
  const { isAllowed } = await requireUserSession(request, [
    "ADMIN",
    "MANAGER",
    "EDITOR",
  ]);
  if (!isAllowed) {
    return redirect(`/`);
  }
  return null;
}

export default function AdminLayoutRoute() {
  return (
    <div data-id="admin-layout-route" className="flex">
      <AdminSidebar />

      <div data-id="admin-layout-outlet" className="grow pb-10">
        <Outlet />
      </div>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside
      className={cn(
        "card min-h-screen min-w-fit flex-col space-y-4",
        "hidden sm:flex"
      )}
    >
      <div className="stack-h-center">
        <RemixNavLink
          to="/admin"
          prefetch="intent"
          className="block min-w-fit transition-opacity hover:opacity-80"
        >
          <Logo />
        </RemixNavLink>
        <ThemeToggleButton />
        <HeaderUserMenu align="center" />
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
                    "w-full",
                    buttonVariants({
                      variant: "navlink",
                      align: "left",
                      isActive,
                    })
                  )
                }
              >
                {name}
              </RemixNavLink>
            </li>
          );
        })}
        <li>
          <ButtonNavLink
            to="/"
            variant="navlink"
            align="left"
            weight="bold"
            className="w-full"
          >
            Go to site
          </ButtonNavLink>
        </li>
      </ul>
    </aside>
  );
}
