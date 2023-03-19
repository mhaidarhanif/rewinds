import { authenticator } from "~/services";
import { getSession } from "~/sessions";

// other user data need to be retrieved, not stored in cookie
export type UserSession = {
  id: string;
};

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
