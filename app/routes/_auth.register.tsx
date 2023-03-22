import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { useId } from "react";

import {
  Alert,
  ButtonLoading,
  Debug,
  Input,
  Label,
  Layout,
  PageHeader,
  RemixForm,
  RemixLinkText,
} from "~/components";
import { configSite } from "~/configs";
import { userModel } from "~/models";
import { schemaUserRegister } from "~/schemas";
import { authenticator } from "~/services";
import {
  createDocumentLinks,
  createMetaData,
  getRedirectTo,
  useRedirectTo,
} from "~/utils";

import type {
  ActionArgs,
  LoaderArgs,
  V2_MetaFunction,
  LinksFunction,
} from "@remix-run/node";
import type { z } from "zod";

export const meta: V2_MetaFunction = () => {
  return createMetaData({
    title: "Register",
    description: "Create new account to join the adventure.",
  });
};

export const links: LinksFunction = () => {
  return createDocumentLinks({ canonicalPath: "/register" });
};

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/user/dashboard",
  });
}

/**
 * More details about the decision here can be read
 * in the _auth.login route action function
 */
export async function action({ request }: ActionArgs) {
  const clonedRequest = request.clone();

  const formData = await clonedRequest.formData();
  const submission = parse(formData, { schema: schemaUserRegister });
  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 });
  }

  const result = await userModel.registerUserPassword(submission.value);

  if (result.error) {
    return json({ ...submission, error: result.error }, { status: 403 });
  }

  await authenticator.authenticate("user-pass", request, {
    successRedirect: getRedirectTo(request) || "/user/dashboard",
    failureRedirect: "/register",
  });
  return json(submission);
}

export default function AuthRegisterRoute() {
  const { searchParams, redirectTo } = useRedirectTo();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData<typeof action>();

  const id = useId();
  const [form, fields] = useForm<z.infer<typeof schemaUserRegister>>({
    id,
    initialReport: "onSubmit",
    lastSubmission: actionData,
    constraint: getFieldsetConstraint(schemaUserRegister),
    onValidate({ formData }) {
      return parse(formData, { schema: schemaUserRegister });
    },
  });
  const { name, username, email, password } = fields;

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="xs" isTextCentered>
          <h1>Join {configSite.name}</h1>
          <p>Let's get started</p>
        </PageHeader>
      }
    >
      <div className="mx-auto w-full max-w-xs">
        <RemixForm {...form.props} method="post" className="space-y-4">
          <fieldset
            className="space-y-2 disabled:opacity-80"
            disabled={isSubmitting}
          >
            <div className="space-y-1">
              <Label htmlFor={name.id}>Full Name</Label>
              <Input
                {...conform.input(name)}
                type="text"
                placeholder="Your Full Name"
                autoComplete="name"
                autoFocus
                required
              />
              {name.error && (
                <Alert variant="danger" id={name.errorId}>
                  {name.error}
                </Alert>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor={username.id}>Username</Label>
              <Input
                {...conform.input(username)}
                type="text"
                placeholder="yourname"
                autoComplete="username"
                required
              />
              {username.error && (
                <Alert variant="danger" id={username.errorId}>
                  {username.error}
                </Alert>
              )}
              <p className="text-xs text-surface-500">
                Between 5 to 20 characters, alphanumeric/underscore
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor={email.id}>Email address</Label>
              <Input
                {...conform.input(email)}
                type="email"
                placeholder="you@email.com"
                autoComplete="email"
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
                placeholder="Password (at least 8 characters)"
                required
              />
              {password.error && (
                <Alert variant="danger" id={password.errorId}>
                  {password.error}
                </Alert>
              )}
              <p className="text-xs text-surface-500">At least 8 characters</p>
            </div>

            <input type="hidden" name="redirectTo" value={redirectTo} />

            <ButtonLoading
              type="submit"
              className="w-full"
              name="intent"
              value="submit"
              isSubmitting={isSubmitting}
              loadingText="Creating account..."
            >
              Create account
            </ButtonLoading>
          </fieldset>

          <div>
            <p className="text-center">
              <RemixLinkText
                to={{ pathname: "/login", search: searchParams.toString() }}
              >
                Have an account? Login
              </RemixLinkText>
            </p>
          </div>
        </RemixForm>
      </div>

      <Debug name="form">{{ actionData, fields }}</Debug>
    </Layout>
  );
}
