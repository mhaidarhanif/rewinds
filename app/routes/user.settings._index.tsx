import { conform, parse, useForm } from "@conform-to/react";
import { parse as parseZod } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { badRequest, forbidden } from "remix-utils";

import {
  Alert,
  ButtonLoading,
  Debug,
  Input,
  Label,
  PageHeader,
  RemixForm,
  RemixLinkText,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components";
import { requireUserSession } from "~/helpers";
import { model } from "~/models";
import {
  schemaUserUpdateData,
  schemaUserUpdatePassword,
  schemaUserUpdateProfile,
} from "~/schemas";
import { createSitemap } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import type { z } from "zod";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const { user } = await requireUserSession(request);

  return json({ user });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const parsed = parse(formData);

  if (parsed.payload.intent === "update-user-data") {
    const submission = parseZod(formData, { schema: schemaUserUpdateData });
    if (!submission.value) {
      return badRequest(submission);
    }
    const result = await model.user.mutation.update(submission.value);
    if (result?.error) {
      return forbidden({ ...submission, error: result.error });
    }
    return json(submission);
  }

  if (parsed.payload.intent === "update-user-profile") {
    const submission = parseZod(formData, { schema: schemaUserUpdateProfile });
    if (!submission.value) {
      return badRequest(submission);
    }
    const result = await model.userProfile.mutation.update(submission.value);
    if (result.error) {
      return forbidden({ ...submission, error: result.error });
    }
    return json(submission);
  }

  if (parsed.payload.intent === "update-user-password") {
    const submission = parseZod(formData, { schema: schemaUserUpdatePassword });
    if (!submission.value) {
      return badRequest(submission);
    }
    const result = await model.userPassword.mutation.update(submission.value);
    if (result.error) {
      return forbidden({ ...submission, error: result.error });
    }
    return json(submission);
  }

  return json(parsed);
}

export default function Route() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="contain-sm">
      <PageHeader size="xs" withBackground={false} withContainer={false}>
        <h1 className="text-3xl">Settings</h1>
        <p>
          <span>Settings for </span>
          <RemixLinkText prefetch="intent" to={`/${user.username}`}>
            @{user.username}
          </RemixLinkText>
        </p>
        <p>Change your profile, email, password, etc</p>
      </PageHeader>

      <section>
        <UserSettingsTabs />
      </section>

      <Debug name="user">{user}</Debug>
    </div>
  );
}

export function UserSettingsTabs() {
  return (
    <Tabs defaultValue="user-data" className="w-full">
      <TabsList>
        <TabsTrigger value="user-data">User</TabsTrigger>
        <TabsTrigger value="user-profile">Profile</TabsTrigger>
        <TabsTrigger value="user-password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="user-data">
        <UserSettingsTabUser />
      </TabsContent>
      <TabsContent value="user-profile">
        <UserSettingsTabProfile />
      </TabsContent>
      <TabsContent value="user-password">
        <UserSettingsTabPassword />
      </TabsContent>
    </Tabs>
  );
}

function UserSettingsTabUser() {
  const { user } = useLoaderData<typeof loader>();

  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [form, { id, name, username, email }] = useForm<
    z.infer<typeof schemaUserUpdateData>
  >({
    initialReport: "onSubmit",
    lastSubmission: actionData,
    onValidate({ formData }) {
      return parseZod(formData, { schema: schemaUserUpdateData });
    },
  });

  return (
    <div>
      <RemixForm {...form.props} method="put" className="max-w-sm">
        <fieldset
          disabled={isSubmitting}
          className="space-y-2 disabled:opacity-80"
        >
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
            <p className="text-xs text-surface-500">
              5 to 20 characters (letters, numbers, underscore)
            </p>
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

          <div className="stack-h-center">
            <ButtonLoading
              type="submit"
              className="grow"
              name="intent"
              value="update-user-data"
              isSubmitting={isSubmitting}
              loadingText="Updating..."
            >
              Update
            </ButtonLoading>
          </div>
        </fieldset>
      </RemixForm>
    </div>
  );
}

function UserSettingsTabProfile() {
  return (
    <div>
      <p className="dim">Update your profile headline and bio.</p>
    </div>
  );
}

function UserSettingsTabPassword() {
  return (
    <div>
      <p className="dim">
        Change your password. After saving, you'll be logged out.
      </p>
    </div>
  );
}
