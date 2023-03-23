import { createCookieSessionStorage } from "@remix-run/node";

import { envServer, invariant } from "~/utils";

invariant(envServer.REMIX_SESSION_SECRET, "REMIX_SESSION_SECRET must be set");

// export the whole sessionStorage object
export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__auth-session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [envServer.REMIX_SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = authSessionStorage;
