import { json, redirect } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import {
  Button,
  Checkbox,
  Input,
  Label,
  Layout,
  PageHeader,
  RemixForm,
  RemixLinkText,
} from "~/components";
import { verifyLogin } from "~/models";
import { createUserSession, getUserId } from "~/sessions";
import { createMetaData } from "~/utils";

import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return createMetaData({
    title: "Login",
    description: "Continue with your account.",
  });
};

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = "/notes";
  const remember = formData.get("remember");

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(String(email), String(password));

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
}

export default function LoginRoute() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/notes";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Layout
      isSpaced
      pageHeader={
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
            <div>
              <Input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                placeholder="tony@stark.com"
              />
              {actionData?.errors?.email && (
                <div id="email-error">{actionData.errors.email}</div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div>
              <Input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
              />
              {actionData?.errors?.password && (
                <div id="password-error">{actionData.errors.password}</div>
              )}
            </div>
          </div>

          <Input type="hidden" name="redirectTo" value={redirectTo} />

          <div className="flex gap-1">
            <Checkbox id="remember" name="remember" />
            <Label htmlFor="remember" className="cursor-pointer">
              Remember me
            </Label>
          </div>

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
