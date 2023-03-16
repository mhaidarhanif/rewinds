import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

import { invariant } from "~/utils";

invariant(process.env.REMIX_SESSION_SECRET, "REMIX_SESSION_SECRET must be set");

export const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__theme-session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.REMIX_SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage);
