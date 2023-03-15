import { json, redirect } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import { useRef } from "react";

import {
  Button,
  Input,
  Label,
  Layout,
  PageHeader,
  RemixForm,
  RemixLinkText,
} from "~/components";
import { createUser, getUserByEmail } from "~/models";
import { getUserId, createUserSession } from "~/sessions";
import { createMetaData, invariant } from "~/utils";

import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return createMetaData({
    title: "Register",
    description: "Create new account to join the adventure.",
  });
};

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const redirectTo = "/";
  const formData = await request.formData();

  const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  invariant(name, "Name is required");
  invariant(username, "Username is required");
  invariant(email, "Email is required");
  invariant(password, "Password is required");

  const existingUser = await getUserByEmail(email.toString());
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser({
    name: name.toString(),
    username: username.toString(),
    email: email.toString(),
    password: password.toString(),
  });

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

export default function RegisterRoute() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <Layout
      isSpaced
      pageHeader={
        <PageHeader size="sm" isTextCentered>
          <h2>Register new account</h2>
          <p>Let's get started to begin your journey</p>
        </PageHeader>
      }
    >
      <div className="mx-auto w-full max-w-xs">
        <RemixForm method="post" className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <div>
              <Input
                id="name"
                required
                autoFocus={true}
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Ryan Wathan"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <div>
              <Input
                id="username"
                required
                name="username"
                type="text"
                autoComplete="username"
                placeholder="ryanwathan"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email address</Label>
            <div>
              <Input
                ref={emailRef}
                id="email"
                required
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                placeholder="ryanwathan@hey.com"
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
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
              />
              {actionData?.errors?.password && (
                <div id="password-error">{actionData.errors.password}</div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />

          <Button type="submit" className="w-full">
            Create Account
          </Button>

          <div>
            <p className="text-center">
              <span>Already have an account? </span>
              <RemixLinkText
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </RemixLinkText>
            </p>
          </div>
        </RemixForm>
      </div>
    </Layout>
  );
}
