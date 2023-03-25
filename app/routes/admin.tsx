import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import {
  buttonVariants,
  HeaderUserMenu,
  Icon,
  Logo,
  RemixNavLink,
  SearchForm,
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

// Admin doesn't need separated Layout component
// Becaus this is already the Layout route for all admin routes
export default function AdminLayoutRoute() {
  return (
    <div data-id="admin-layout-route" className="flex">
      <AdminSidebar />

      <main data-id="admin-layout-outlet" className="grow pb-10">
        <Outlet />
      </main>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside
      className={cn(
        "hidden sm:block",
        "sticky top-0 h-screen", // sticky sidebar
        "min-w-fit space-y-4 p-2 sm:flex sm:flex-col sm:p-4",
        "border-r border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900"
      )}
    >
      <div className="stack-h-center">
        <RemixNavLink
          prefetch="intent"
          to="/admin"
          className="block min-w-fit transition-opacity hover:opacity-80"
        >
          <Logo />
        </RemixNavLink>
        <ThemeToggleButton />
        <HeaderUserMenu align="center" />
      </div>

      <ul className="grow space-y-2">
        <SearchForm action="/admin/search" />
        {configAdmin.navItems.map((navItem) => {
          return (
            <li key={navItem.name} className="space-y-1">
              <RemixNavLink
                key={navItem.name}
                to={navItem.to}
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
                <Icon name={navItem.icon} />
                <span>{navItem.name}</span>
              </RemixNavLink>
              {navItem.items.length > 0 && (
                <ul className="ml-4 space-y-1">
                  {navItem.items.map((item) => {
                    return (
                      <li key={item.name}>
                        <RemixNavLink
                          key={item.name}
                          to={item.to}
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
                          <Icon name={item.icon} />
                          <span>{item.name}</span>
                        </RemixNavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
