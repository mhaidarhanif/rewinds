/* eslint-disable tailwindcss/no-custom-classname */
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { RemixLink } from "~/components";
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
      <ul className="space-y-2">
        {notes.map((note) => {
          return (
            <RemixLink key={note.id} to={note.id} className="block">
              <li className="card hover:card-hover">
                <h4>{note.title}</h4>
              </li>
            </RemixLink>
          );
        })}
      </ul>
    </div>
  );
}
