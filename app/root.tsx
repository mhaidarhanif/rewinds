// https://remix.run/docs/en/main/file-conventions/route-files-v2#md-root-route
import { json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { IconoirProvider } from "iconoir-react";
import NProgress from "nprogress";
import { useEffect } from "react";
import {
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "remix-themes";

import {
  Debug,
  Layout,
  PageHeader,
  TailwindIndicator,
  Toaster,
  TooltipProvider,
} from "~/components";
import { configDev, configDocumentLinks, configSite } from "~/configs";
import { model } from "~/models";
import { authenticator } from "~/services";
import { themeSessionResolver } from "~/sessions";
import { cn, createCacheHeaders, createMetaData, getEnv } from "~/utils";

import type {
  HeadersFunction,
  LinksFunction,
  LoaderArgs,
  V2_MetaDescriptor,
  V2_MetaFunction,
} from "@remix-run/node";
import type { RootLoaderData } from "~/hooks";

export const meta: V2_MetaFunction = () => {
  return createMetaData() satisfies V2_MetaDescriptor[];
};

export const headers: HeadersFunction = () => {
  return {
    "Accept-CH": "Sec-CH-Prefers-Color-Scheme",
  };
};

export const links: LinksFunction = () => {
  return configDocumentLinks;
};

export async function loader({ request }: LoaderArgs) {
  // Get ENV data from server
  const ENV = getEnv();

  // Get theme function and data from cookie via remix-themes
  const { getTheme } = await themeSessionResolver(request);
  const theme = getTheme();

  // Get user data from database, not from session
  // But don't redirect if not authenticated
  const userSession = await authenticator.isAuthenticated(request);

  // Don't do anything extra when not logged in
  if (!userSession) {
    return json({
      ENV,
      theme,
    });
  }

  // Put user and its profile data
  const user = await model.user.query.getForSession({ id: userSession.id });

  // But if the user session is no longer valid, log it out
  if (!user) {
    return redirect(`/logout`);
  }

  // Finally, put the active user data to the root loader data
  const loaderData = {
    ENV,
    theme,
    user,
  } satisfies RootLoaderData;

  return json(loaderData, { headers: createCacheHeaders(request, 15) });
}

/**
 * Remix Themes
 * Wrap your App with ThemeProvider.
 * `specifiedTheme` is the stored theme in the session storage.
 * `themeAction` is the action name that's used to change the theme
 * in the session storage.
 */
export default function Route() {
  const data = useLoaderData();

  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

/**
 * If the theme is missing in session storage, PreventFlashOnWrongTheme will
 * get the browser theme before hydration and will prevent a flash in browser.
 * The client code runs conditionally, it won't be rendered if we have a theme
 * in session storage.
 */
function App() {
  const data = useLoaderData();
  const navigation = useNavigation();
  const [theme] = useTheme();
  const defaultTheme = theme ? theme : "dark";

  /**
   * NProgress loading bar
   * Alternative: https://sergiodxa.com/articles/use-nprogress-in-a-remix-app
   */
  useEffect(() => {
    if (navigation.state === "idle") NProgress.done();
    else NProgress.start();
  }, [navigation.state]);

  return (
    <html lang="en" data-theme={defaultTheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>

      <body id="__remix" className={cn(defaultTheme)}>
        <TooltipProvider>
          <IconoirProvider
            iconProps={{ strokeWidth: 2, width: "1.5em", height: "1.5em" }}
          >
            <>
              <Outlet />
              <Toaster />
              {configDev.isDevelopment && configDev.features.debugScreens && (
                <TailwindIndicator />
              )}
            </>
          </IconoirProvider>
        </TooltipProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function RootDocumentBoundary({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  // Cannot use useLoaderData in catch/error boundary
  return (
    <html lang="en" data-theme={Theme.DARK}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        {title && <title>{title}</title>}
        <Links />
      </head>
      <body id="__remix">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
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
        <Layout
          noThemeToggle
          isSpaced
          layoutHeader={
            <PageHeader size="sm">
              <h1>Error {error.status}</h1>
              {error.statusText && <h2>{error.statusText}</h2>}
              <p>{message}</p>
            </PageHeader>
          }
        >
          <div>
            <p>Here's the error information that can be informed to Rewinds.</p>
            <Debug name="error.data" isAlwaysShow>
              {error.data}
            </Debug>
          </div>
        </Layout>
      </RootDocumentBoundary>
    );
  } else if (error instanceof Error) {
    return (
      <RootDocumentBoundary title="Sorry, unexpected error occured.">
        <Layout
          noThemeToggle
          isSpaced
          layoutHeader={
            <PageHeader size="sm">
              <h1>Error from {configSite.name}</h1>
            </PageHeader>
          }
        >
          <div>
            <p>Here's the error information that can be informed to Rewinds.</p>

            <p>{error.message}</p>
            <Debug name="error" isAlwaysShow>
              {error}
            </Debug>

            <p>The stack trace is:</p>
            <Debug name="error.stack" isAlwaysShow>
              {error.stack}
            </Debug>
          </div>
        </Layout>
      </RootDocumentBoundary>
    );
  } else {
    return (
      <Layout>
        <h1>Unknown Error</h1>
      </Layout>
    );
  }
}
