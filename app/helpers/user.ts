import { userModel } from "~/models";
import { authenticator } from "~/services";
import { getSession } from "~/sessions";
import { invariant } from "~/utils";

import type { Prisma, UserRole } from "@prisma/client";

// User Sesson is a limited user data stored in the auth cookie
export type UserSession = {
  id: string;
};

// User Data is a more complete user data that can be retrieved,
// but not stored in the auth cookie
export type UserData = NonNullable<
  Prisma.PromiseReturnType<typeof userModel.getUserForSession>
>;

// Remix way to protect routes
// Can only be used server-side
// https://remix.run/docs/en/main/pages/faq#md-how-can-i-have-a-parent-route-loader-validate-the-user-and-protect-all-child-routes
export async function requireUserSession(
  request: Request,
  expectedRoleSymbols?: UserRole["symbol"][]
) {
  // Get user session from app cookie
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!userSession) {
    await authenticator.logout(request, { redirectTo: "/login" });
  }
  invariant(userSession, "User Session is not available");

  // Get user data from database
  const user = await userModel.getUserForSession({ id: userSession.id });
  if (!user) {
    await authenticator.logout(request, { redirectTo: "/login" });
  }
  invariant(user, "User is not available");

  // Check role if expectedRoleSymbols exist
  const isAllowed = expectedRoleSymbols
    ? requireUserRole(user, expectedRoleSymbols)
    : true;

  return {
    userSession,
    user,
    isAllowed,
  };
}

// Can be used client-side or server-side
export function requireUserRole(
  user: UserData,
  expectedRoleSymbols?: UserRole["symbol"][]
) {
  // Find if user's role is available in the list
  const isAllowed = expectedRoleSymbols?.find(
    (symbol) => user.role.symbol === symbol
  );

  // If user's role is not as expected to be allowed
  if (!isAllowed) {
    return false;
  } else {
    return true;
  }
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
