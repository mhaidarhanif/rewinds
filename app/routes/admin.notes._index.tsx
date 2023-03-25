import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { AvatarAuto, ButtonLink, Debug, RemixLink } from "~/components";
import { Eye } from "~/icons";
import { model } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const notes = await model.adminNote.query.getAll();
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
          <span>All Notes</span>
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
                <p className="text-xs">{note.slug}</p>
                <div className="flex gap-2">
                  <AvatarAuto user={note.user} className="size-md" />
                  <p>
                    {note.user.name} (@{note.user.username})
                  </p>
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
