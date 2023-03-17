import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Button,
  ButtonLink,
  RemixForm,
  RemixLinkText,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components";
import { EditPencil, Trash } from "~/icons";
import { adminNote } from "~/models";
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
  const { noteId } = params;
  invariant(noteId, "noteId doesn't exist");

  const note = await adminNote.getNote({ id: noteId });
  return json({ note });
}

export async function action({ request }: ActionArgs) {
  return redirect(`/admin/notes`);
}

// Similar with "admin-notes-edit"
export default function AdminNotesViewRoute() {
  const { note } = useLoaderData<typeof loader>();

  if (!note) {
    return <p>Note doesn't exist.</p>;
  }

  return (
    <div data-id="admin-notes-view" className="stack-v">
      <header>
        <div className="stack-h-center">
          <span>View Note</span>

          <ButtonLink to="edit" size="xs" variant="info">
            <EditPencil className="size-xs" />
            <span> Edit</span>
          </ButtonLink>

          <RemixForm method="delete">
            <Button
              size="xs"
              variant="danger"
              name="intent"
              value="delete-note"
            >
              <Trash className="size-xs" />
              <span> Delete</span>
            </Button>
          </RemixForm>
        </div>
      </header>

      <section className="card stack-v">
        <header>
          <div
            data-id="note-view-id-slug"
            className="flex flex-wrap gap-2 text-xs opacity-50"
          >
            <p>
              ID: <b>{note.id}</b>
            </p>
            <p>
              Slug: <b>{note.slug}</b>
            </p>
          </div>

          <TooltipProvider>
            <div className="flex flex-wrap gap-2 text-xs opacity-50">
              <p>
                <span>Made by </span>
                <RemixLinkText to={`/admin/users/${note.user.id}`}>
                  {note.user.name}
                </RemixLinkText>
              </p>
              <Tooltip>
                <TooltipTrigger>
                  <p>
                    <span>Created </span>
                    <b>{formatRelativeTime(note.createdAt)} </b>
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <b>{formatDateTime(note.createdAt)}</b>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <p>
                    <span>Updated </span>
                    <b>{formatRelativeTime(note.updatedAt)} </b>
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

        <div className="prose-config sm:prose-xl sm:py-4">{note.content}</div>
      </section>

      {/* <Debug name="note">{note}</Debug> */}
    </div>
  );
}
