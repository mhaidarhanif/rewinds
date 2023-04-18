import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { badRequest, forbidden, serverError } from "remix-utils";

import {
  Alert,
  Button,
  ButtonLink,
  ButtonLoading,
  Input,
  Label,
  RemixForm,
  TextArea,
  TooltipAuto,
} from "~/components";
import { requireUserSession, updateNoteSlug } from "~/helpers";
import { useRootLoaderData } from "~/hooks";
import { model } from "~/models";
import { schemaNoteUpdate } from "~/schemas";
import { createSitemap, invariant } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import type { z } from "zod";
import { InfoEmpty, SubmitDocument } from "~/icons";

export const handle = createSitemap();

export async function loader({ request, params }: LoaderArgs) {
  const { userSession } = await requireUserSession(request);
  invariant(params.noteId, "noteId not found");

  const note = await model.userNote.query.getById({
    id: params.noteId,
    userId: userSession.id,
  });
  invariant(note, "Note not found");

  const isOwner = userSession.id === note.userId;
  if (!isOwner) {
    return forbidden({ note: null, isOwner: null });
  }

  return json({ note, isOwner });
}

export async function action({ request, params }: ActionArgs) {
  const { userSession, user } = await requireUserSession(request);

  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaNoteUpdate });
  if (!submission.value || submission.intent !== "submit") {
    return badRequest(submission);
  }

  try {
    const newSlug = updateNoteSlug(submission.value);
    const result = await model.userNote.mutation.update({
      note: submission.value,
      user: userSession,
    });
    if (!result) {
      return badRequest(submission);
    }
    return redirect(`/${user.username}/${newSlug}`);
  } catch (error) {
    console.error(error);
    return serverError(submission);
  }
}

export default function Route() {
  const { user } = useRootLoaderData();
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
      <header className="py-4">
        <h1 className="queue-center text-3xl">
          <SubmitDocument />
          <span>Edit note</span>
          <TooltipAuto
            content={
              <p>
                A note can be a blog post, news article, <br /> tutorial, or
                just a regular note
              </p>
            }
          >
            <InfoEmpty className="size-md" />
          </TooltipAuto>
        </h1>
      </header>

      <RemixForm {...form.props} method="PUT">
        <fieldset
          disabled={isSubmitting}
          className="space-y-4 disabled:opacity-80"
        >
          <div className="dim stack text-xs">
            <span>
              ID: <code>{note.id}</code>
            </span>
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
              defaultValue={note.title}
              className="border-none px-0 sm:text-xl"
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
              className="border-none px-0 sm:text-xl"
            />
            <Alert id={description.errorId}>{description.error}</Alert>
          </div>

          <div className="space-y-1">
            <Label htmlFor={content.id}>Content</Label>
            <TextArea
              {...conform.input(content)}
              placeholder="Type your longer content here, maximum content length of 10,000 characters..."
              rows={20}
              defaultValue={note.content}
              className="overflow-y-scroll border-none px-0 sm:text-xl"
            />
            <Alert id={content.errorId}>{content.error}</Alert>
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
            <ButtonLink
              to={`/${user?.username}/${note.slug}`}
              variant="ghost"
              accent="red"
            >
              Cancel
            </ButtonLink>
          </div>
        </fieldset>
      </RemixForm>
    </div>
  );
}
