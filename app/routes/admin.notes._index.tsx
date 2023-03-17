/* eslint-disable tailwindcss/no-custom-classname */
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug, RemixLink } from "~/components";
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

  if (notes.length <= 0) {
    return <span>No notes. Please add new.</span>;
  }

  return (
    <div className="stack-v">
      <header>
        <span>All Notes</span>
      </header>

      <ul className="space-y-2">
        {notes.map((note) => {
          return (
            <RemixLink key={note.id} to={note.id} className="block">
              <li className="card hover:card-hover">
                <h4>{note.title}</h4>
                <p>{note.slug}</p>
              </li>
            </RemixLink>
          );
        })}
      </ul>

      <Debug name="notes">{notes}</Debug>
    </div>
  );
}
