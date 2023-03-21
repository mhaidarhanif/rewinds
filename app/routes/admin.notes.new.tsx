import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useCatch, useNavigation } from "@remix-run/react";
import { useId } from "react";

import {
  Button,
  ButtonLink,
  ButtonLoading,
  Debug,
  Input,
  Label,
  RemixForm,
  TextArea,
} from "~/components";
import { authorizeUser } from "~/helpers";
import { adminNote } from "~/models";
import { schemaNoteNew } from "~/schemas";
import { createSitemap } from "~/utils";

import type { ActionArgs } from "@remix-run/node";
import type { z } from "zod";

const isDevelopment = process.env.NODE_ENV === "development";

export const handle = createSitemap();

export async function action({ request }: ActionArgs) {
  const { userSession } = await authorizeUser(request);

  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaNoteNew });
  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 });
  }

  try {
    const newNote = await adminNote.addNewNote({
      user: userSession,
      note: submission.value,
    });
    if (!newNote) {
      return json(submission, { status: 500 });
    }
    return redirect(`/admin/notes/${newNote.id}`);
  } catch (error) {
    console.error(error);
    return json(submission, { status: 400 });
  }
}

export default function AdminNotesNewRoute() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const id = useId();
  const [form, { title, description, content }] = useForm<
    z.infer<typeof schemaNoteNew>
  >({
    id,
    initialReport: "onSubmit",
    lastSubmission: actionData,
    onValidate({ formData }) {
      return parse(formData, { schema: schemaNoteNew });
    },
    constraint: getFieldsetConstraint(schemaNoteNew),
  });

  return (
    <div data-id="admin-notes-new" className="stack-v">
      <header>
        <span>Add New Note</span>
      </header>

      <RemixForm
        {...form.props}
        method="post"
        className="card max-w-lg space-y-4"
      >
        <fieldset
          disabled={isSubmitting}
          className="space-y-2 disabled:opacity-80"
        >
          <header>
            <div className="space-y-1">
              <Label htmlFor={title.id}>Title</Label>
              <Input
                {...conform.input(title)}
                type="text"
                placeholder="Note title or what's on your mind?"
                defaultValue={isDevelopment ? "A new example" : ""}
                autoFocus
              />
              <p id={title.errorId} role="alert">
                {title.error}
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor={description.id}>Description</Label>
              <Input
                {...conform.input(description)}
                type="text"
                placeholder="Add a short description"
                defaultValue={isDevelopment ? "The description" : ""}
              />
              <p id={description.errorId} role="alert">
                {description.error}
              </p>
            </div>
          </header>

          <div className="space-y-1">
            <Label htmlFor={content.id}>Content</Label>
            <TextArea
              {...conform.input(content)}
              placeholder="Type your longer content here..."
              rows={10}
              defaultValue={
                isDevelopment ? "Here is the long content about the note." : ""
              }
            />
            <p id={content.errorId} role="alert">
              {content.error}
            </p>
            <p className="text-sm text-surface-500">
              The note has a maximum content length of 1,000 characters.
            </p>
          </div>

          <div className="flex gap-2">
            <ButtonLoading
              type="submit"
              variant="subtle"
              className="grow"
              name="intent"
              value="submit"
              isSubmitting={isSubmitting}
              loadingText="Saving..."
            >
              Save
            </ButtonLoading>
            <Button type="reset" variant="ghost">
              Reset
            </Button>
            <ButtonLink to={`/admin/notes`} variant="link" accent="red">
              <span>Cancel</span>
            </ButtonLink>
          </div>
        </fieldset>
      </RemixForm>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Error when add new: {caught.status}</h1>
      <Debug name="caught.data">{caught.data}</Debug>
    </div>
  );
}
