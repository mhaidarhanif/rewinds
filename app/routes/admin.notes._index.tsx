import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { ButtonLink, Debug, RemixLink } from "~/components";
import { Eye } from "~/icons";
import { adminNoteModel } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const notes = await adminNoteModel.getAllNotes();
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
        <div className="stack-h-center">
          <span>Notes</span>
          <ButtonLink to="/notes" size="xs" variant="info">
            <Eye className="size-xs" />
            <span>View All</span>
          </ButtonLink>
        </div>
      </header>

      <ul className="space-y-2">
        {notes.map((note) => {
          return (
            <li key={note.id}>
              <RemixLink to={note.id} className="card hover:card-hover block">
                <h4>{note.title}</h4>
                <p>{note.slug}</p>
              </RemixLink>
            </li>
          );
        })}
      </ul>

      <Debug name="notes">{notes}</Debug>
    </div>
  );
}
