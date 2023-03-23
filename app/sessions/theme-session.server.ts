import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

import { getEnv, getEnvPrivate, invariant } from "~/utils";

const env = getEnv();
const envPrivate = getEnvPrivate();

invariant(envPrivate.REMIX_SESSION_SECRET, "REMIX_SESSION_SECRET must be set");

export const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__theme-session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [envPrivate.REMIX_SESSION_SECRET],
    secure: env.NODE_ENV === "production",
  },
});

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage);
