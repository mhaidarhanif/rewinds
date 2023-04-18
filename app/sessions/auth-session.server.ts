import { createCookieSessionStorage } from "@remix-run/node";

import {
  convertDaysToSeconds,
  getEnv,
  getEnvPrivate,
  invariant,
} from "~/utils";

const env = getEnv();
const envPrivate = getEnvPrivate();

invariant(envPrivate.REMIX_SESSION_SECRET, "REMIX_SESSION_SECRET must be set");

// TODO: Integrate on register and login flow
const remember = true;

// Export the whole sessionStorage object
export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__auth-session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: remember
      ? convertDaysToSeconds(7) // EDITME: Set max age for session persistence
      : undefined,
    secrets: [envPrivate.REMIX_SESSION_SECRET],
    secure: env.NODE_ENV === "production",
  },
});

// You can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = authSessionStorage;
