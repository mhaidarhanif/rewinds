// https://remix.run/docs/en/main/file-conventions/route-files-v2#md-root-route
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { IconoirProvider } from "iconoir-react";
import NProgress from "nprogress";
import { useEffect } from "react";
import {
  ThemeProvider,
  useTheme,
  PreventFlashOnWrongTheme,
} from "remix-themes";

import { Toaster } from "~/components";
import { configDocumentLinks } from "~/configs";
import { themeSessionResolver } from "~/sessions";
import { cn, createMetaData } from "~/utils";

import type {
  HeadersFunction,
  LinksFunction,
  LoaderArgs,
  LoaderFunction,
} from "@remix-run/node";

export const meta = createMetaData();

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
  const { getTheme } = await themeSessionResolver(request);

  return json({
    theme: getTheme(),
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>

      <body
        className={cn(
          process.env.NODE_ENV === "development" && "debug-screens",
          "navigation-colors min-h-screen scroll-smooth bg-surface-50 font-sans text-surface-900 antialiased dark:bg-surface-900 dark:text-surface-50",
          "selection:bg-brand-500/20 selection:text-brand-900 dark:selection:bg-brand-500/20 dark:selection:text-brand-100"
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
