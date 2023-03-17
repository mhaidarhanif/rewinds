import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

import { envServer, invariant } from "~/utils";

invariant(envServer.REMIX_SESSION_SECRET, "REMIX_SESSION_SECRET must be set");

export const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__theme-session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [envServer.REMIX_SESSION_SECRET],
    secure: envServer.NODE_ENV === "production",
  },
});

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage);
