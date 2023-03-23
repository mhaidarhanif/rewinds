import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import { model } from "~/models";
import { authSessionStorage } from "~/sessions/auth-session.server";

import type { UserSession } from "~/helpers";

/**
 * Authentication/Authorization
 *
 * Authenticate: After submitting the correct credentials on login
 * Authorize: Before doing something sensitive
 */

/**
 * Create an instance of the authenticator, pass a generic with what
 * strategies will return and will store in the session.
 */
export const authenticator = new Authenticator<UserSession>(authSessionStorage);

/**
 * Authenticator Strategy
 *
 * This is just for the Login, not the Register.
 * Note that the complete login with password logic is in the login route action.
 * Because we want to do inline error message along with Conform,
 * not using the error session thrown by Remix Auth's AuthorizationError.
 */
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    if (!email || !password) {
      throw new AuthorizationError("User and password are required");
    }

    const user = (await model.user.query.getByEmail({ email })) as UserSession;

    if (!user.id) {
      throw new AuthorizationError("User is not found");
    }

    /**
     * The type of this user must match the type you pass to the Authenticator
     * the strategy will automatically inherit the type if you instantiate
     * directly inside the `use` method.
     */
    return user;
  }),
  /**
   * Each strategy has a name and can be changed to use another one
   * same strategy multiple times, especially useful for the OAuth2 strategy.
   */
  "user-pass"
);
