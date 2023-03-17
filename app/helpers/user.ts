import { redirect } from "@remix-run/node";

import { authenticator } from "~/services";
import { getSession } from "~/sessions";

export type UserSession = {
  id: string;
  roleSymbol: string;
};

export function isUser(user: UserSession): user is UserSession {
  return user && typeof user === "object" && typeof user.id === "string";
}

export function isUserAdmin(user: UserSession): user is UserSession {
  return user.roleSymbol.includes("ADMIN" || "MANAGER" || "EDITOR");
}

/**
 * Authentication logic
 * After submitting the correct email and password with user-pass strategy
 */

export function authenticateUser(request: Request, redirectTo?: string) {
  return authenticator.authenticate("user-pass", request, {
    successRedirect: redirectTo ? redirectTo : "/user",
    failureRedirect: "/login",
    throwOnError: true,
  });
}

/**
 * Get user data from the session
 * If need more complete data, use the database models
 */

export function getUserSession(request: Request) {
  return authenticator.isAuthenticated(request);
}

export async function getUserRedirect(request: Request) {
  const url = new URL(request.url);

  return authenticator.isAuthenticated(request, {
    failureRedirect: `/login?redirect=${url.pathname}`,
  });
}

export async function redirectIfNotAdmin(request: Request) {
  const user = await authenticator.isAuthenticated(request);
  const url = new URL(request.url);

  if (!user) {
    throw redirect(`/login?redirect=${url.pathname}`);
  }
  if (user.roleSymbol !== "ADMIN") {
    throw redirect("/");
  }
}

export function redirectIfAuthenticated(
  request: Request,
  successRedirect?: string
) {
  return authenticator.isAuthenticated(request, {
    successRedirect: successRedirect || "/user",
  });
}

/**
 * Other helpers
 */

export function logoutSession(request: Request) {
  return authenticator.logout(request, { redirectTo: "/" });
}

export function getUserAvatarImageUrl(name: string | null) {
  return `https://api.dicebear.com/5.x/initials/svg?seed=${name}&backgroundColor=3949ab`;
}

export async function getErrorSession(request: Request) {
  const session = await getSession(request.headers.get("cookie"));
  const errorSession = session.get(authenticator.sessionErrorKey);
  return errorSession;
}
