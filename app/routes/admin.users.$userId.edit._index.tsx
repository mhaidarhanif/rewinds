import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { badRequest } from "remix-utils";

import {
  Alert,
  Button,
  ButtonLink,
  ButtonLoading,
  Input,
  Label,
  RemixForm,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components";
import { prisma } from "~/libs";
import { model } from "~/models";
import { schemaAdminUserUpdate } from "~/schemas";
import { createSitemap, invariant } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import type { z } from "zod";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  invariant(params.userId, `User with id ${params.userId} not found`);

  const [user, userRoles] = await prisma.$transaction([
    model.adminUser.query.getById({ id: params.userId }),
    model.userRole.query.getAll(),
  ]);

  return json({ user, userRoles });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaAdminUserUpdate });
  if (!submission.value) {
    return badRequest(submission);
  }

  if (submission.payload.intent === "update-user") {
    await model.adminUser.mutation.update({
      user: submission.value,
      roleSymbol: submission.value.roleSymbol,
    });
    return redirect(`..`);
  }

  return json(submission);
}

export default function Route() {
  const { user, userRoles } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [form, { id, name, username, email, roleSymbol }] = useForm<
    z.infer<typeof schemaAdminUserUpdate>
  >({
    shouldValidate: "onSubmit",
    lastSubmission: actionData,
    onValidate({ formData }) {
      return parse(formData, { schema: schemaAdminUserUpdate });
    },
    constraint: getFieldsetConstraint(schemaAdminUserUpdate),
  });

  if (!user) {
    return <span>User not found.</span>;
  }

  return (
    <div className="stack">
      <header>
        <span>Edit User</span>
      </header>

      <RemixForm {...form.props} method="PUT" className="card max-w-lg">
        <fieldset
          disabled={isSubmitting}
          className="space-y-2 disabled:opacity-80"
        >
          <div className="queue-center text-xs">
            <span>
              ID: <code>{user.id}</code>
            </span>
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
              placeholder="username"
              defaultValue={user.username}
            />
            {username.error && (
              <Alert variant="danger" id={username.errorId}>
                {username.error}
              </Alert>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor={email.id}>Email</Label>
            <Input
              {...conform.input(email)}
              type="email"
              placeholder="name@email.com"
              defaultValue={user.email}
            />
            {email.error && (
              <Alert variant="danger" id={email.errorId}>
                {email.error}
              </Alert>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor={roleSymbol.id}>Role</Label>
            <Select
              {...conform.input(roleSymbol)}
              defaultValue={user.role.symbol}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={user.role.name} />
              </SelectTrigger>
              <SelectContent position="popper">
                {userRoles.map((userRole) => {
                  return (
                    <SelectItem key={userRole.symbol} value={userRole.symbol}>
                      {userRole.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {roleSymbol.error && (
              <Alert variant="danger" id={roleSymbol.errorId}>
                {roleSymbol.error}
              </Alert>
            )}
          </div>

          <div className="queue-center">
            <ButtonLoading
              type="submit"
              name="intent"
              value="update-user"
              isSubmitting={isSubmitting}
              loadingText="Updating..."
              className="grow"
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
