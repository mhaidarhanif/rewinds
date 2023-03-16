import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Button, ButtonLink, RemixForm } from "~/components";
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
        <h3>View Note</h3>
      </header>

      <section className="card stack-v">
        <header>
          <div className="text-xs opacity-50">
            <p>
              ID: <b>{note.id}</b>
            </p>
            <p>
              Slug: <b>{note.slug}</b>
            </p>
          </div>
          <h3 className="sm:text-3xl">{note.title}</h3>
          <h4>
            {note.description || (
              <span className="opacity-30">No description</span>
            )}
          </h4>
        </header>

        <div className="prose-config sm:prose-xl sm:py-4">{note.content}</div>

        <div className="text-xs opacity-50">
          <p>
            <span>Made by </span>
            <b>{note.user.name}</b>
          </p>
          <p>
            <span>Created </span>
            <b>{formatRelativeTime(note.createdAt)} </b>
            <b>({formatDateTime(note.createdAt)})</b>
          </p>
          <p>
            <span>Updated </span>
            <b>{formatRelativeTime(note.updatedAt)} </b>
            <b>({formatDateTime(note.updatedAt)})</b>
          </p>
        </div>

        <div className="flex gap-2">
          <ButtonLink to="edit" size="xs" variant="ghost">
            <EditPencil className="size-xs" />
            <span> Edit</span>
          </ButtonLink>
          <RemixForm method="delete">
            <Button size="xs" variant="ghost" accent="red">
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
