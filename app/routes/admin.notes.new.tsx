import { conform, useForm as useConform } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useId } from "react";
import { z } from "zod";

import {
  Button,
  ButtonLink,
  Debug,
  Input,
  Label,
  RemixForm,
  TextArea,
} from "~/components";
import { adminNote } from "~/models";
import { authenticator } from "~/services";
import { createSitemap } from "~/utils";

import type { ActionArgs } from "@remix-run/node";

const isDevelopment = process.env.NODE_ENV === "development";

export const handle = createSitemap();

export const schemaNote = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1000, "Content length max of 1000 characters"),
});

export async function action({ request }: ActionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  // server-side validation
  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaNote });
  if (!submission.value || submission.intent !== "submit") {
    return json({ submission }, { status: 400 });
  }

  // add new note
  const newNote = await adminNote.addNewNote({
    user,
    note: submission.value,
  });
  if (!newNote) {
    return json({ submission }, { status: 500 });
  }

  // redirect to new note view
  return redirect(`/admin/notes/${newNote.id}`);
}

export default function AdminNotesNewRoute() {
  const actionData = useActionData<typeof action>();

  const id = useId();
  const [form, { title, description, content }] = useConform<
    z.infer<typeof schemaNote>
  >({
    id,
    initialReport: "onSubmit",
    // client-side validation that can be overriden
    onValidate({ formData }) {
      return parse(formData, { schema: schemaNote });
    },
    // more schema details
    constraint: getFieldsetConstraint(schemaNote),
  });

  return (
    <div data-id="admin-notes-new" className="stack-v">
      <header>
        <span>Add New Note</span>
      </header>

      <RemixForm
        method="post"
        {...form.props}
        className="card max-w-lg space-y-4"
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
          <Button
            type="submit"
            variant="subtle"
            className="grow"
            name="intent"
            value="submit"
          >
            Save Note
          </Button>
          <Button type="reset" variant="ghost">
            Reset
          </Button>
          <ButtonLink to={`/admin/notes`} variant="link" accent="red">
            <span>Cancel</span>
          </ButtonLink>
        </div>
      </RemixForm>

      <Debug name="actionData">
        {{ actionData, title, description, content }}
      </Debug>
    </div>
  );
}
