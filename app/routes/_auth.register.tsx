import { json } from "@remix-run/node";
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
import { createMetaData } from "~/utils";

import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return createMetaData({
    title: "Register",
    description: "Create new account to join the adventure.",
  });
};

export async function loader({ request }: LoaderArgs) {
  return json({});
}

export async function action({ request }: ActionArgs) {
  return null;
}

export default function RegisterRoute() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;

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
                id="email"
                required
                name="email"
                type="email"
                autoComplete="email"
                aria-describedby="email-error"
                placeholder="ryanwathan@hey.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                aria-describedby="password-error"
              />
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
