import { redirect } from "@remix-run/node";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

import {
  buttonVariants,
  Debug,
  HeaderUserMenu,
  Icon,
  Logo,
  PageAdminHeader,
  RemixNavLink,
  SearchForm,
  ThemeToggleButton,
} from "~/components";
import { configAdmin, configSite } from "~/configs";
import { requireUserSession } from "~/helpers";
import { RootDocumentBoundary } from "~/root";
import { cn, createSitemap } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const { userIsAllowed } = await requireUserSession(request, [
    "ADMIN",
    "MANAGER",
    "EDITOR",
  ]);
  if (!userIsAllowed) {
    return redirect(`/`);
  }
  return null;
}

export async function action({ request }: ActionArgs) {
  const { userIsAllowed } = await requireUserSession(request, [
    "ADMIN",
    "MANAGER",
    "EDITOR",
  ]);
  if (!userIsAllowed) {
    return redirect(`/`);
  }
  return null;
}

// Admin doesn't need separated Layout component
// Becaus this is already the Layout route for all admin routes
export default function Route() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="grow pb-10">{children}</main>
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
        "border-r-2 border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900"
      )}
    >
      <div className="queue-center">
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
                end={navItem.end}
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
                <ul className="ms-4 space-y-1">
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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    let message;
    switch (error.status) {
      case 401:
        message = `Sorry, you can't access this page.`;
        break;
      case 404:
        message = `Sorry, this page is not available.`;
        break;
      default:
        throw new Error(error.data || error.statusText);
    }

    return (
      <RootDocumentBoundary title={message}>
        <AdminLayout>
          <PageAdminHeader size="sm">
            <h1>Error {error.status}</h1>
            {error.statusText && <h2>{error.statusText}</h2>}
            <p>{message}</p>
          </PageAdminHeader>
          <section className="px-layout space-y-2">
            <p>Here's the error information that can be informed to Rewinds.</p>
            <Debug name="error.data" isAlwaysShow>
              {error.data}
            </Debug>
          </section>
        </AdminLayout>
      </RootDocumentBoundary>
    );
  } else if (error instanceof Error) {
    return (
      <RootDocumentBoundary title="Sorry, unexpected error occured.">
        <AdminLayout>
          <PageAdminHeader size="sm">
            <h1>Error from {configSite.name}</h1>
          </PageAdminHeader>
          <section className="px-layout space-y-2">
            <p>Here's the error information that can be informed to Rewinds.</p>

            <pre>{error.message}</pre>
            <Debug name="error" isAlwaysShow>
              {error}
            </Debug>

            <p>The stack trace is:</p>
            <Debug name="error.stack" isAlwaysShow>
              {error.stack}
            </Debug>
          </section>
        </AdminLayout>
      </RootDocumentBoundary>
    );
  } else {
    return (
      <AdminLayout>
        <h1>Unknown Error</h1>
      </AdminLayout>
    );
  }
}
