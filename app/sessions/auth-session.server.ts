import { createCookieSessionStorage } from "@remix-run/node";

import { invariant } from "~/utils";

invariant(process.env.REMIX_SESSION_SECRET, "REMIX_SESSION_SECRET must be set");

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__auth-session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.REMIX_SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage;
