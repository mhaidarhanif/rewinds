import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";

import {
  Button,
  ButtonLink,
  Debug,
  RemixForm,
  RemixLinkText,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
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

import type { LoaderArgs } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  invariant(params.noteId, "noteId does not exist");
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
      return badRequest(submission);
    }
  }
}

// Similar with "admin-notes-edit"
export default function AdminNotesViewRoute() {
  const { note } = useLoaderData<typeof loader>();

  if (!note) {
    return <p>Note does not exist.</p>;
  }

  return (
    <div data-id="admin-notes-view" className="stack-v">
      <header>
        <div className="stack-h-center">
          <span>View Note</span>
          <ButtonLink to={`/notes/${note.slug}`} size="xs" variant="info">
            <Eye className="size-xs" />
            <span>View</span>
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

      <section className="card stack-v">
        <header>
          <div
            data-id="note-view-id-slug"
            className="flex flex-wrap gap-2 text-xs"
          >
            <p>
              ID: <b>{note.id}</b>
            </p>
            <p>
              Slug: <b>{note.slug}</b>
            </p>
          </div>

          <TooltipProvider>
            <div className="flex flex-wrap gap-2 text-xs">
              <p>
                <span>Created by: </span>
                <RemixLinkText to={`/admin/users/${note.user.id}`}>
                  {note.user.name}
                </RemixLinkText>
              </p>
              <Tooltip>
                <TooltipTrigger>
                  <p>
                    <span>Created: </span>
                    <b>{formatRelativeTime(note.createdAt)}</b>
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <b>{formatDateTime(note.createdAt)}</b>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <p>
                    <span>Updated: </span>
                    <b>{formatRelativeTime(note.updatedAt)}</b>
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <b>{formatDateTime(note.createdAt)}</b>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </header>

        <h2>{note.title}</h2>

        <h3>
          {note.description || (
            <span className="opacity-30">No description</span>
          )}
        </h3>

        <div className="prose-config whitespace-pre-wrap sm:prose-xl sm:py-4">
          {note.content}
        </div>
      </section>

      <Debug name="note">{note}</Debug>
    </div>
  );
}
