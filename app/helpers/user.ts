import { userModel } from "~/models";
import { authenticator } from "~/services";
import { getSession } from "~/sessions";
import { invariant } from "~/utils";

import type { Prisma } from "@prisma/client";

// limited user data in auth cookie
export type UserSession = {
  id: string;
};

// more user data that can be retrieved, not stored in cookie
export type UserData = NonNullable<
  Prisma.PromiseReturnType<typeof userModel.getUserForSession>
>;

/**
 * Authentication/Authorization
 *
 * Authenticate: After submitting the correct credentials on login
 * Authorize: Before doing something sensitive
 */

export async function authenticateUser(request: Request, redirectTo = "/user") {
  return authenticator.authenticate("user-pass", request, {
    successRedirect: redirectTo ? redirectTo : "/user",
    failureRedirect: "/login",
    throwOnError: true,
  });
}

export async function authorizeUser(request: Request) {
  // user session from app cookie
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!userSession) {
    await deauthenticateUser(request);
  }
  invariant(userSession, "User Session is not available");

  // user data from database
  const user = await userModel.getUserForSession({ id: userSession.id });
  if (!user) {
    await deauthenticateUser(request);
  }
  invariant(user, "User is not available");

  return { userSession, user };
}

export async function deauthenticateUser(
  request: Request,
  redirectTo = "/login"
) {
  await authenticator.logout(request, { redirectTo });
}

export async function getUserRedirect(request: Request) {
  const url = new URL(request.url);
  return authenticator.isAuthenticated(request, {
    failureRedirect: `/login?redirect=${url.pathname}`,
  });
}

export async function getAuthErrorSession(request: Request) {
  const session = await getSession(request.headers.get("cookie"));
  const errorSession = session.get(authenticator.sessionErrorKey);
  return errorSession;
}
