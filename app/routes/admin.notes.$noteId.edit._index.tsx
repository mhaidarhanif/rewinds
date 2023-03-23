import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { json, redirect } from "@remix-run/node";
import {
  useActionData,
  useCatch,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

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
import { requireUserSession } from "~/helpers";
import { model } from "~/models";
import { schemaNoteEdit } from "~/schemas";
import { createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import type { z } from "zod";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  const { noteId } = params;
  invariant(noteId, "noteId does not exist");

  const note = await model.adminNote.query.getById({ id: noteId });
  return json({ note });
}

export async function action({ request, params }: ActionArgs) {
  const { userSession } = await requireUserSession(request);

  const { noteId } = params;
  invariant(noteId, `Note with id ${noteId} does not exist`);
  if (!noteId) {
    return redirect(`/admin/notes`);
  }

  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaNoteEdit });
  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 });
  }

  try {
    const updatedNote = await model.adminNote.mutation.update({
      user: userSession,
      note: submission.value,
    });
    if (!updatedNote) {
      return json(submission, { status: 500 });
    }
    return redirect(`/admin/notes/${updatedNote.id}`);
  } catch (error) {
    console.error(error);
    return json(submission, { status: 400 });
  }
}

// Similar with "admin-notes-view"
export default function AdminNotesEditRoute() {
  const { note } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [form, { id, slug, title, description, content }] = useForm<
    z.infer<typeof schemaNoteEdit>
  >({
    initialReport: "onSubmit",
    lastSubmission: actionData,
    onValidate({ formData }) {
      return parse(formData, { schema: schemaNoteEdit });
    },
    constraint: getFieldsetConstraint(schemaNoteEdit),
  });

  if (!note) {
    return <p>Note does not exist.</p>;
  }

  return (
    <div data-id="admin-notes-edit" className="stack-v">
      <header>
        <span>Edit Note</span>
      </header>

      <RemixForm {...form.props} method="put" className="card stack-v max-w-lg">
        <fieldset
          disabled={isSubmitting}
          className="space-y-2 disabled:opacity-80"
        >
          <header>
            <div className="flex flex-wrap gap-2 text-xs opacity-50">
              <p>
                ID: <b>{note.id}</b>
              </p>
              <p>
                Slug: <b>{note.slug}</b>
              </p>
            </div>

            <input hidden {...conform.input(id)} defaultValue={note.id} />
            <input hidden {...conform.input(slug)} defaultValue={note.slug} />

            <div className="space-y-1">
              <Label htmlFor={title.id}>Title</Label>
              <Input
                {...conform.input(title)}
                type="text"
                placeholder="Note title or what's on your mind?"
                autoFocus
                defaultValue={note.title}
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
                defaultValue={note.description}
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
              defaultValue={note.content}
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

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Error when edit: {caught.status}</h1>
      <Debug name="caught.data">{caught.data}</Debug>
    </div>
  );
}
