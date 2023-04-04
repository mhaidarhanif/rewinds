import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { AvatarAuto, ButtonLink, Debug, RemixLink } from "~/components";
import { Eye } from "~/icons";
import { model } from "~/models";
import { createSitemap, formatPluralItems } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const notes = await model.adminNote.query.getAll();
  const notesCount = notes.length;
  return json({ notes, notesCount });
}

export default function Route() {
  const { notes, notesCount } = useLoaderData<typeof loader>();

  if (notes.length <= 0) {
    return <span>No notes. Please add new.</span>;
  }

  return (
    <div className="stack">
      <header>
        <div className="queue-center">
          <span>{formatPluralItems("note", notesCount)}</span>
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
              <RemixLink
                to={note.id}
                className="card hover:card-hover block space-y-1"
              >
                <h3>{note.title}</h3>
                <code className="text-xs">{note.slug}</code>
                <div className="queue-center">
                  <AvatarAuto user={note.user} className="size-md" />
                  <span className="text-sm">
                    {note.user.name} (@{note.user.username})
                  </span>
                </div>
              </RemixLink>
            </li>
          );
        })}
      </ul>

      <Debug name="notes">{notes}</Debug>
    </div>
  );
}
