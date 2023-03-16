import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import { verifyLogin } from "~/models";
import { sessionStorage } from "~/sessions/auth-session.server";

import type { UserSession } from "~/helpers";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<UserSession>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    if (!email || !password) {
      return {} as UserSession;
    }

    const user = (await verifyLogin(email, password)) as UserSession;
    if (!user) {
      return {} as UserSession;
    }

    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
