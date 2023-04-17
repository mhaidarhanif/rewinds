import { conform, parse, useForm } from "@conform-to/react";
import { parse as parseZod } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect } from "react";
import { badRequest, forbidden } from "remix-utils";

import {
  Alert,
  ButtonLoading,
  ButtonCopy,
  Debug,
  Input,
  InputPassword,
  Label,
  PageHeader,
  RemixForm,
  RemixLinkText,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextArea,
} from "~/components";
import { requireUserSession } from "~/helpers";
import { Settings } from "~/icons";
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
  const { intent } = parsed.payload;

  if (intent === "update-user-data") {
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

  if (intent === "update-user-profile") {
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

  if (intent === "update-user-password") {
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
        <h1 className="queue-center text-3xl">
          <Settings />
          Settings
        </h1>
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
      <TabsList className="mb-2">
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
    shouldValidate: "onSubmit",
    lastSubmission: actionData,
    onValidate({ formData }) {
      return parseZod(formData, { schema: schemaUserUpdateData });
    },
  });

  return (
    <div>
      <RemixForm {...form.props} replace method="PUT" className="max-w-sm">
        <fieldset
          disabled={isSubmitting}
          className="space-y-2 disabled:opacity-80"
        >
          <input hidden {...conform.input(id)} defaultValue={user.id} />

          <div className="space-y-1">
            <div className="queue-center justify-between">
              <Label htmlFor={name.id}>Name</Label>
              <ButtonCopy
                variant="ghost"
                size="xs"
                contentToCopy={user.name || name.defaultValue}
              />
            </div>
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
              4 to 20 characters (letters, numbers, dot, underscore)
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

          <div className="queue-center">
            <ButtonLoading
              type="submit"
              name="intent"
              value="update-user-data"
              isSubmitting={isSubmitting}
              loadingText="Updating Name..."
              className="grow"
            >
              Update Name
            </ButtonLoading>
          </div>
        </fieldset>
      </RemixForm>
    </div>
  );
}

function UserSettingsTabProfile() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [form, { id, headline, bio }] = useForm<
    z.infer<typeof schemaUserUpdateProfile>
  >({
    shouldValidate: "onSubmit",
    lastSubmission: actionData,
    onValidate({ formData }) {
      return parseZod(formData, { schema: schemaUserUpdateProfile });
    },
  });

  return (
    <div>
      <RemixForm {...form.props} replace method="PUT" className="max-w-sm">
        <fieldset
          disabled={isSubmitting}
          className="space-y-2 disabled:opacity-80"
        >
          <input
            hidden
            {...conform.input(id)}
            defaultValue={String(user.profile.id)}
          />

          <div className="space-y-1">
            <div className="queue-center justify-between">
              <Label htmlFor={headline.id}>Headline</Label>
              <ButtonCopy
                variant="ghost"
                size="xs"
                contentToCopy={user.profile.headline || headline.defaultValue}
              />
            </div>
            <Input
              {...conform.input(headline)}
              placeholder="Your headline"
              defaultValue={String(user.profile.headline)}
            />
            {headline.error && (
              <Alert variant="danger" id={headline.errorId}>
                {headline.error}
              </Alert>
            )}
          </div>

          <div className="space-y-1">
            <div className="queue-center justify-between">
              <Label htmlFor={bio.id}>Bio</Label>
              <ButtonCopy
                variant="ghost"
                size="xs"
                contentToCopy={user.profile.bio || bio.defaultValue}
              />
            </div>
            <TextArea
              {...conform.input(bio)}
              placeholder="Your bio here..."
              defaultValue={String(user.profile.bio)}
              rows={5}
            />
            {bio.error && (
              <Alert variant="danger" id={bio.errorId}>
                {bio.error}
              </Alert>
            )}
          </div>

          <div className="queue-center">
            <ButtonLoading
              type="submit"
              name="intent"
              value="update-user-profile"
              isSubmitting={isSubmitting}
              loadingText="Updating Profile..."
              className="grow"
            >
              Update Profile
            </ButtonLoading>
          </div>
        </fieldset>
      </RemixForm>
    </div>
  );
}

function UserSettingsTabPassword() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [form, { id, password, confirmPassword }] = useForm<
    z.infer<typeof schemaUserUpdatePassword>
  >({
    shouldValidate: "onSubmit",
    lastSubmission: actionData,
    onValidate({ formData }) {
      return parseZod(formData, { schema: schemaUserUpdatePassword });
    },
  });

  /**
   * Reset form fields after submitting
   * Can work with Conform if the input has defaultValue of empty string
   */
  useEffect(() => {
    if (!isSubmitting) {
      form.ref.current?.reset();
    }
  }, [isSubmitting, form.ref]);

  return (
    <div>
      <RemixForm {...form.props} replace method="PUT" className="max-w-sm">
        <fieldset
          disabled={isSubmitting}
          className="space-y-2 disabled:opacity-80"
        >
          <input hidden {...conform.input(id)} defaultValue={user.id} />

          <div className="space-y-1">
            <Label htmlFor={password.id}>New Password</Label>
            <InputPassword
              {...conform.input(password)}
              placeholder="Your new password"
              defaultValue=""
            />
            {password.error && (
              <Alert variant="danger" id={password.errorId}>
                {password.error}
              </Alert>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor={confirmPassword.id}>Confirm New Password</Label>
            <InputPassword
              {...conform.input(confirmPassword)}
              placeholder="Confirm your new password"
              defaultValue=""
            />
            {confirmPassword.error && (
              <Alert variant="danger" id={confirmPassword.errorId}>
                {confirmPassword.error}
              </Alert>
            )}
          </div>

          <div className="queue-center">
            <ButtonLoading
              type="submit"
              name="intent"
              value="update-user-password"
              isSubmitting={isSubmitting}
              loadingText="Updating Password..."
              className="grow"
            >
              Update Password
            </ButtonLoading>
          </div>
        </fieldset>
      </RemixForm>
    </div>
  );
}
