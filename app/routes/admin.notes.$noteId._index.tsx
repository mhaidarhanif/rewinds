import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Button,
  ButtonLink,
  RemixForm,
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
        <span>View Note</span>
      </header>

      <section className="card stack-v">
        <div className="flex flex-wrap gap-2 text-xs opacity-50">
          <p>
            ID: <b>{note.id}</b>
          </p>
          <p>
            Slug: <b>{note.slug}</b>
          </p>
        </div>

        <header>
          <h3 className="sm:text-3xl">{note.title}</h3>
          <h4>
            {note.description || (
              <span className="opacity-30">No description</span>
            )}
          </h4>
        </header>

        <div className="prose-config sm:prose-xl sm:py-4">{note.content}</div>

        <TooltipProvider>
          <div className="flex flex-wrap gap-2 text-xs opacity-50">
            <p>
              <span>Made by </span>
              <b>{note.user.name}</b>
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

        <div className="flex gap-2">
          <ButtonLink to="edit" size="xs" variant="ghost">
            <EditPencil className="size-xs" />
            <span> Edit</span>
          </ButtonLink>
          <RemixForm method="delete">
            <Button
              size="xs"
              variant="ghost"
              accent="red"
              name="intent"
              value="delete-note"
            >
              <Trash className="size-xs" />
              <span> Delete</span>
            </Button>
          </RemixForm>
        </div>
      </section>

      {/* <Debug name="note">{note}</Debug> */}
    </div>
  );
}
