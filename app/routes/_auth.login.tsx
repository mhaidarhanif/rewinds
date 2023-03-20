import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { useId } from "react";
import { z } from "zod";

import {
  Alert,
  Button,
  Debug,
  Input,
  Label,
  Layout,
  PageHeader,
  RemixForm,
  RemixLinkText,
} from "~/components";
import { configSite } from "~/configs";
import { Loader2 } from "~/icons";
import { userModel } from "~/models";
import { authenticator } from "~/services";
import {
  createDocumentLinks,
  createMetaData,
  getRedirectTo,
  useRedirectTo,
} from "~/utils";

import type {
  V2_MetaFunction,
  ActionArgs,
  LoaderArgs,
  LinksFunction,
} from "@remix-run/node";

export const schemaLogin = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password length at least 8 characters"),
});

export const meta: V2_MetaFunction = () => {
  return createMetaData({
    title: "Login",
    description: "Continue with your account.",
  });
};

export const links: LinksFunction = () => {
  return createDocumentLinks({ canonicalPath: "/login" });
};

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/user/profile",
  });
}

/**
 * This also applicable in the _auth.register route action function
 */
export async function action({ request }: ActionArgs) {
  // Clone Request/ReadableStream to prevent the stream being locked
  // Because we're using the request later too for Remix-Auth Authenticator
  const clonedRequest = request.clone();

  const formData = await clonedRequest.formData();
  const submission = parse(formData, { schema: schemaLogin });
  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 });
  }

  // Check user email and password
  const result = await userModel.loginUserPassword(submission.value);

  // Use custom error for Conform submission
  if (result.error) {
    return json({ ...submission, error: result.error }, { status: 403 });
  }

  /**
   * Remix-Auth Authenticator
   *
   * Call the method with the name of the strategy we want to use and the
   * request object, optionally we pass an object with the URLs we want the user
   * to be redirected to after a success or a failure
   *
   * Login via services/auth-service.server + models/user.server
   * But this won't check the email and password again
   */
  await authenticator.authenticate("user-pass", request, {
    successRedirect: getRedirectTo(request) || "/user/profile",
    failureRedirect: "/login",
  });
  return json(submission);
}

export default function AuthLoginRoute() {
  const { searchParams, redirectTo } = useRedirectTo();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData<typeof action>();

  const id = useId();
  const [form, fields] = useForm<z.infer<typeof schemaLogin>>({
    id,
    initialReport: "onSubmit",
    lastSubmission: actionData,
    constraint: getFieldsetConstraint(schemaLogin),
    onValidate({ formData }) {
      return parse(formData, { schema: schemaLogin });
    },
  });
  const { email, password } = fields;

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="xs" isTextCentered>
          <h1>Login to continue</h1>
          <p>Use your {configSite.name} account</p>
        </PageHeader>
      }
    >
      <div data-id="auth-login" className="mx-auto w-full max-w-xs">
        <RemixForm {...form.props} method="post" className="space-y-4">
          <fieldset
            className="space-y-2 disabled:opacity-80"
            disabled={isSubmitting}
          >
            <div className="space-y-1">
              <Label htmlFor={email.id}>Email address</Label>
              <Input
                {...conform.input(email)}
                type="email"
                placeholder="you@email.com"
                autoComplete="email"
                autoFocus
                required
              />
              {email.error && (
                <Alert variant="danger" id={email.errorId}>
                  {email.error}
                </Alert>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor={password.id}>Password</Label>
              <Input
                {...conform.input(password)}
                type="password"
                autoComplete="current-password"
                placeholder="Enter password"
                required
              />
              {password.error && (
                <Alert variant="danger" id={password.errorId}>
                  {password.error}
                </Alert>
              )}
              <p className="text-xs text-surface-500">At least 8 characters</p>
            </div>

            {/* TODO: Implement later */}
            {/* <div className="flex gap-1">
            <Checkbox id="remember" name="remember" />
            <Label htmlFor="remember" className="cursor-pointer">
              Remember me
            </Label>
          </div> */}

            <Input type="hidden" name="redirectTo" value={redirectTo} />

            <Button
              type="submit"
              className="w-full"
              name="intent"
              value="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </fieldset>

          <p className="text-center">
            <span>New to {configSite.name}? </span>
            <RemixLinkText
              to={{ pathname: "/register", search: searchParams.toString() }}
            >
              Register for free
            </RemixLinkText>
          </p>
        </RemixForm>
      </div>

      <Debug name="form">{{ actionData, fields }}</Debug>
    </Layout>
  );
}
