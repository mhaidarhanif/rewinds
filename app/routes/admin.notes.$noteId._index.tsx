import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { serverError } from "remix-utils";

import {
  Button,
  ButtonLink,
  Debug,
  RemixForm,
  RemixLinkText,
  TooltipAuto,
} from "~/components";
import { requireUserSession } from "~/helpers";
import { EditPencil, Eye, Trash } from "~/icons";
import { model } from "~/models";
import {
  createSitemap,
  formatDateTime,
  formatRelativeTime,
  invariant,
} from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  invariant(params.noteId, "noteId not found");
  const note = await model.adminNote.query.getById({ id: params.noteId });
  return json({ note });
}

export async function action({ request }: ActionArgs) {
  await requireUserSession(request);

  const formData = await request.formData();
  const submission = parse(formData);

  if (submission.payload.intent === "delete-note") {
    try {
      await model.adminNote.mutation.deleteById({
        id: submission.payload.noteId,
      });
      return redirect(`..`);
    } catch (error) {
      console.error(error);
      return serverError(submission);
    }
  }
}

export default function Route() {
  const { note } = useLoaderData<typeof loader>();

  if (!note) {
    return <span>Note not found.</span>;
  }

  return (
    <div className="stack">
      <header>
        <div className="queue-center">
          <span>View Note</span>
          <ButtonLink
            to={`/${note.user.username}/${note.slug}`}
            size="xs"
            variant="info"
          >
            <Eye className="size-xs" />
            <span>View on Site</span>
          </ButtonLink>
          <ButtonLink to="edit" size="xs" variant="warning">
            <EditPencil className="size-xs" />
            <span>Edit</span>
          </ButtonLink>
          <RemixForm method="delete">
            <input type="hidden" name="noteId" value={note.id} />
            <Button
              size="xs"
              variant="danger"
              name="intent"
              value="delete-note"
            >
              <Trash className="size-xs" />
              <span>Delete</span>
            </Button>
          </RemixForm>
        </div>
      </header>

      <section className="card stack">
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

          <div className="queue-center text-xs">
            <span>
              <span>Created by: </span>
              <RemixLinkText
                prefetch="intent"
                to={`/admin/users/${note.user.id}`}
              >
                {note.user.name}
              </RemixLinkText>
            </span>
            <span>•</span>
            <TooltipAuto content={<b>{formatDateTime(note.createdAt)}</b>}>
              <span>Created at: </span>
              <b>{formatRelativeTime(note.createdAt)}</b>
            </TooltipAuto>
            <span>•</span>
            <TooltipAuto content={<b>{formatDateTime(note.updatedAt)}</b>}>
              <span>Updated at: </span>
              <b>{formatRelativeTime(note.updatedAt)}</b>
            </TooltipAuto>
          </div>
        </header>

        <div className="prose-config whitespace-pre-wrap sm:py-4">
          <h1>{note.title}</h1>
          <h2>
            {note.description || (
              <span className="opacity-30">No description</span>
            )}
          </h2>
          {note.content}
        </div>
      </section>

      <Debug name="note">{note}</Debug>
    </div>
  );
}
