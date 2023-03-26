import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { badRequest, serverError } from "remix-utils";

import {
  Alert,
  Button,
  ButtonLink,
  ButtonLoading,
  Input,
  Label,
  RemixForm,
} from "~/components";
import { model } from "~/models";
import { schemaAdminUserEdit } from "~/schemas";
import { createSitemap, invariant } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import type { z } from "zod";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  invariant(params.userId, `User with id ${params.userId} does not exist`);
  const user = await model.adminUser.query.getById({ id: params.userId });
  return json({ user });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaAdminUserEdit });
  if (!submission.value || submission.intent !== "submit") {
    return badRequest(submission);
  }

  try {
    const updatedUser = await model.adminUser.mutation.update({
      user: submission.value,
    });
    if (!updatedUser) {
      return badRequest(submission);
    }
    return redirect(`..`);
  } catch (error) {
    console.error(error);
    return serverError(submission);
  }
}

export default function AdminUsersEdit() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [form, { id, name, username, email }] = useForm<
    z.infer<typeof schemaAdminUserEdit>
  >({
    initialReport: "onSubmit",
    lastSubmission: actionData,
    onValidate({ formData }) {
      return parse(formData, { schema: schemaAdminUserEdit });
    },
    constraint: getFieldsetConstraint(schemaAdminUserEdit),
  });

  if (!user) {
    return <p>User does not exist.</p>;
  }

  return (
    <div data-id="admin-users-edit" className="stack-v">
      <header>
        <span>Edit User</span>
      </header>

      <RemixForm {...form.props} method="put" className="card stack-v max-w-lg">
        <fieldset
          disabled={isSubmitting}
          className="space-y-2 disabled:opacity-80"
        >
          <header>
            <div className="flex gap-2 text-xs">
              <p>
                ID: <b>{user.id}</b>
              </p>
            </div>

            <input hidden {...conform.input(id)} defaultValue={user.id} />

            <div className="space-y-1">
              <Label htmlFor={name.id}>Name</Label>
              <Input
                {...conform.input(name)}
                type="text"
                placeholder="Full Name"
                defaultValue={user.name}
              />
              <Alert id={name.errorId}>{name.error}</Alert>
            </div>

            <div className="space-y-1">
              <Label htmlFor={username.id}>Username</Label>
              <Input
                {...conform.input(username)}
                type="text"
                placeholder="username"
                defaultValue={user.username}
              />
              <Alert id={username.errorId}>{username.error}</Alert>
            </div>

            <div className="space-y-1">
              <Label htmlFor={email.id}>email</Label>
              <Input
                {...conform.input(email)}
                type="email"
                placeholder="name@email.com"
                defaultValue={user.email}
              />
              <Alert id={email.errorId}>{email.error}</Alert>
            </div>
          </header>

          <div className="flex gap-2">
            <ButtonLoading
              type="submit"
              className="grow"
              name="intent"
              value="submit"
              isSubmitting={isSubmitting}
              loadingText="Updating..."
            >
              Update
            </ButtonLoading>
            <Button type="reset" variant="subtle">
              Reset
            </Button>
            <ButtonLink to=".." variant="ghost" accent="red">
              Cancel
            </ButtonLink>
          </div>
        </fieldset>
      </RemixForm>
    </div>
  );
}
