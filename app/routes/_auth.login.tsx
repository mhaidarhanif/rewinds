import { useSearchParams } from "@remix-run/react";

import {
  Button,
  Input,
  Label,
  Layout,
  PageHeader,
  RemixForm,
  RemixLinkText,
} from "~/components";
import { authenticator } from "~/services/auth-service.server";
import { createMetaData } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return createMetaData({
    title: "Login",
    description: "Continue with your account.",
  });
};

// Loader: we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: LoaderArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/user",
  });
}

// Action
// we need to export an action function, here we will use the
// `authenticator.authenticate method`
export async function action({ request }: ActionArgs) {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/user",
    failureRedirect: "/login",
  });
}

export default function AuthLoginRoute() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/notes";

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="sm" isTextCentered>
          <h2>Login to continue</h2>
          <p>Use your Rewinds account</p>
        </PageHeader>
      }
    >
      <div className="mx-auto w-full max-w-xs">
        <RemixForm method="post" className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email address</Label>
            <Input
              type="email"
              name="email"
              placeholder="ryanwathan@hey.com"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </div>

          <Input type="hidden" name="redirectTo" value={redirectTo} />

          {/* <div className="flex gap-1">
            <Checkbox id="remember" name="remember" />
            <Label htmlFor="remember" className="cursor-pointer">
              Remember me
            </Label>
          </div> */}

          <Button type="submit" className="w-full">
            Log in
          </Button>

          <p className="text-center">
            <span>Need an account? </span>
            <RemixLinkText
              to={{
                pathname: "/register",
                search: searchParams.toString(),
              }}
            >
              Register
            </RemixLinkText>
          </p>
        </RemixForm>
      </div>
    </Layout>
  );
}
