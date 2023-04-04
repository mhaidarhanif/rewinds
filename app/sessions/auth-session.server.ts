import { createCookieSessionStorage } from "@remix-run/node";

import { getEnv, getEnvPrivate, invariant } from "~/utils";

const env = getEnv();
const envPrivate = getEnvPrivate();

invariant(envPrivate.REMIX_SESSION_SECRET, "REMIX_SESSION_SECRET must be set");

// TODO: integrate on register and login flow
const remember = true;

// export the whole sessionStorage object
export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__auth-session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: remember
      ? 60 * 60 * 24 * 7 // 7 days
      : undefined,
    secrets: [envPrivate.REMIX_SESSION_SECRET],
    secure: env.NODE_ENV === "production",
  },
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = authSessionStorage;
