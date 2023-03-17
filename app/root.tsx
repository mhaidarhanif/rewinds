// https://remix.run/docs/en/main/file-conventions/route-files-v2#md-root-route
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useNavigation,
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

import { Debug, Layout, PageHeader, Toaster } from "~/components";
import { configDocumentLinks } from "~/configs";
import { themeSessionResolver } from "~/sessions";
import { cn, createMetaData, getEnv } from "~/utils";

import { getUserSession } from "./helpers";

import type {
  HeadersFunction,
  LinksFunction,
  LoaderArgs,
  LoaderFunction,
  V2_MetaFunction,
  V2_HtmlMetaDescriptor,
} from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    ...createMetaData(),
  ] satisfies V2_HtmlMetaDescriptor[];
};

export const headers: HeadersFunction = () => {
  return {
    "Accept-CH": "Sec-CH-Prefers-Color-Scheme",
  };
};

export const links: LinksFunction = () => {
  return configDocumentLinks;
};

// Return the theme from the session storage using the loader
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const ENV = getEnv();

  const { getTheme } = await themeSessionResolver(request);
  const theme = getTheme();

  const user = await getUserSession(request);
  if (!user) {
    return json({ ENV, theme });
  }

  return json({
    ENV,
    theme,
    user,
  });
};

/**
 * Remix Themes
 * Wrap your app with ThemeProvider.
 * `specifiedTheme` is the stored theme in the session storage.
 * `themeAction` is the action name that's used to change the theme
 * in the session storage.
 */
export default function AppWithProviders() {
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
  const [theme] = useTheme();
  const navigation = useNavigation();

  /**
   * NProgress loading bar
   * Alternative: https://sergiodxa.com/articles/use-nprogress-in-a-remix-app
   */
  useEffect(() => {
    if (navigation.state === "idle") NProgress.done();
    else NProgress.start();
  }, [navigation.state]);

  return (
    <html lang="en" data-theme={theme ?? ""}>
      <head>
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>

      <body
        className={cn(
          process.env.NODE_ENV === "development" && "debug-screens"
        )}
      >
        <IconoirProvider
          iconProps={{ strokeWidth: 2, width: "1.5em", height: "1.5em" }}
        >
          <>
            <Outlet />
            <Toaster />
          </>
        </IconoirProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function RootDocument({
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
        <Meta />
        {title && <title>{title}</title>}
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <RootDocument title="Sorry, unexpected error occured.">
      <Layout
        noThemeToggle
        isSpaced
        pageHeader={
          <PageHeader size="sm">
            <h2>Error from Rewinds: {error.message}</h2>
          </PageHeader>
        }
      >
        <div>
          <p>Here's the error information that can be informed to Rewinds.</p>
          <Debug>{error}</Debug>
        </div>
      </Layout>
    </RootDocument>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = `Sorry, you can't access this page.`;
      break;
    case 404:
      message = `Sorry, this page is not available.`;
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <RootDocument title={message}>
      <Layout
        noThemeToggle
        isSpaced
        pageHeader={
          <PageHeader size="sm">
            <h2>
              Sorry, error {caught.status}: {caught.statusText}
            </h2>
            <p>{message}</p>
          </PageHeader>
        }
      >
        <div>
          <p>Here's the error information that can be informed to Rewinds.</p>
          <Debug>{caught}</Debug>
        </div>
      </Layout>
    </RootDocument>
  );
}
