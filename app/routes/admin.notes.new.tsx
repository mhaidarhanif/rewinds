import { redirect } from "@remix-run/node";

import { conform, useForm as useConform } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
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
import { createSitemap } from "~/utils";

import type { Submission } from "@conform-to/react";
import type { ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function addNewNote({
  title,
  description,
  content,
}: z.infer<typeof schemaNoteNew>) {
  console.log({ title, description, content });
  return null;
}

const schemaNoteNew = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
});

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaNoteNew });

  if (!submission.value || submission.intent !== "submit") {
    return json(
      { ...submission, payload: submission.payload },
      { status: 400 }
    );
  }

  await addNewNote(submission.value);

  return json(submission);
  // return redirect(`.`); // TODO: redirect to $noteId
}

const isDevelopment = process.env.NODE_ENV === "development";

export default function AdminNotesNewRoute() {
  const actionData = useActionData<typeof action>();

  const id = useId();
  const [form, { title, description, content }] = useConform<
    z.infer<typeof schemaNoteNew>
  >({
    id,
    lastSubmission: actionData as Submission,
    initialReport: "onSubmit",
    // client-side validation that can be overrided
    onValidate({ formData }) {
      return parse(formData, { schema: schemaNoteNew });
    },
    // more schema details
    constraint: getFieldsetConstraint(schemaNoteNew),
  });

  return (
    <div data-id="admin-notes-new" className="stack-v">
      <header className="space-y-2">
        <h3>Add New Note</h3>
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
              placeholder="What's on your mind?"
              autoFocus
              defaultValue={isDevelopment ? "A new example" : ""}
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
              placeholder="Short description"
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
            placeholder="Type your note content here..."
            rows={10}
            defaultValue={
              isDevelopment ? "Here is the long content about the note." : ""
            }
          />
          <p id={content.errorId} role="alert">
            {content.error}
          </p>
          <p className="text-sm text-surface-500">
            The note has a maximum content of 1,000 characters.
          </p>
        </div>

        <div className="flex gap-2">
          <Button type="submit" variant="subtle" className="grow">
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
