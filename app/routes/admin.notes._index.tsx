import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { ButtonLink, Debug, PageHeader } from "~/components";
import { Plus } from "~/icons";
import { adminNote } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const notes = await adminNote.getAllNotes();
  return json({ notes });
}

export default function AdminNotesRoute() {
  const { notes } = useLoaderData<typeof loader>();

  if (!notes) {
    return <p>No notes. Please add one.</p>;
  }

  return (
    <div className="stack-v">
      <h3>All Notes</h3>
      {notes.map((note) => {
        return (
          <div key={note.id} className="card">
            <h4>{note.title}</h4>
            <div>{note.content}</div>
          </div>
        );
      })}
    </div>
  );
}
