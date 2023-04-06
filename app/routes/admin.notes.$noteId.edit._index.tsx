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
  TextArea,
} from "~/components";
import { model } from "~/models";
import { schemaNoteUpdate } from "~/schemas";
import { createSitemap, invariant } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import type { z } from "zod";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  invariant(params.noteId, "noteId not found");
  const note = await model.adminNote.query.getById({ id: params.noteId });
  return json({ note });
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaNoteUpdate });
  if (!submission.value || submission.intent !== "submit") {
    return badRequest(submission);
  }

  try {
    const updatedNote = await model.adminNote.mutation.update({
      note: submission.value,
    });
    if (!updatedNote) {
      return badRequest(submission);
    }
    return redirect(`..`);
  } catch (error) {
    console.error(error);
    return serverError(submission);
  }
}

export default function Route() {
  const { note } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [form, { id, slug, title, description, content }] = useForm<
    z.infer<typeof schemaNoteUpdate>
  >({
    shouldValidate: "onSubmit",
    lastSubmission: actionData,
    onValidate({ formData }) {
      return parse(formData, { schema: schemaNoteUpdate });
    },
    constraint: getFieldsetConstraint(schemaNoteUpdate),
  });

  if (!note) {
    return <span>Note not found.</span>;
  }

  return (
    <div className="stack">
      <header>
        <span>Edit Note</span>
      </header>

      <RemixForm {...form.props} method="PUT" className="card max-w-lg">
        <fieldset
          disabled={isSubmitting}
          className="space-y-2 disabled:opacity-80"
        >
          <header>
            <div className="queue-center text-xs">
              <span>
                ID: <code>{note.id}</code>
              </span>
              <span>•</span>
              <span>
                Slug: <code>{note.slug}</code>
              </span>
            </div>

            <input hidden {...conform.input(id)} defaultValue={note.id} />
            <input hidden {...conform.input(slug)} defaultValue={note.slug} />

            <div className="space-y-1">
              <Label htmlFor={title.id}>Title</Label>
              <Input
                {...conform.input(title)}
                type="text"
                placeholder="Add a title"
                autoFocus
                defaultValue={note.title}
              />
              <Alert id={title.errorId}>{title.error}</Alert>
            </div>

            <div className="space-y-1">
              <Label htmlFor={description.id}>Description</Label>
              <Input
                {...conform.input(description)}
                type="text"
                placeholder="Add a description"
                defaultValue={note.description}
              />
              <Alert id={description.errorId}>{description.error}</Alert>
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
            <Alert id={content.errorId}>{content.error}</Alert>
            <p className="text-sm text-surface-500">
              The note has a maximum content length of 10,000 characters.
            </p>
          </div>

          <div className="queue-center">
            <ButtonLoading
              type="submit"
              name="intent"
              value="submit"
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
