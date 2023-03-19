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
 * Authentication logic
 * After submitting the correct email and password with user-pass strategy
 */

export async function authenticateUser(request: Request, redirectTo?: string) {
  return authenticator.authenticate("user-pass", request, {
    successRedirect: redirectTo ? redirectTo : "/user",
    failureRedirect: "/login",
    throwOnError: true,
  });
}

export async function authorizeUser(request: Request) {
  const userSession = await authenticator.isAuthenticated(request);
  invariant(userSession, "User session invalid");

  const user = await userModel.getUserForSession({ id: userSession.id });
  invariant(user, "User not found");

  return user;
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
