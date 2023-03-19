import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { PageHeader, RemixLink, RemixLinkText } from "~/components";
import { note } from "~/models";
import { createMetaData } from "~/utils";

export const meta = createMetaData({
  title: "Notes",
  description: "Public notes created by the community.",
});

export async function loader() {
  const notes = await note.getAllNotes();
  return json({ notes });
}

export default function NotesIndexRoute() {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <div>
      <PageHeader isTextCentered withBackground={false} size="sm">
        <h1>All notes</h1>
        <p>All published notes from the users.</p>
      </PageHeader>

      <section>
        <ul className="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {notes.map((note) => {
            return (
              <li key={note.slug} className="space-y-4">
                <RemixLink to={note.slug} className="block">
                  <h3>{note.title}</h3>
                  <h4>{note.description}</h4>
                </RemixLink>
                <p>{note.content}</p>
                <p>
                  <span>by </span>
                  <RemixLinkText to={`/users/${note.user.id}`}>
                    {note.user.name}
                  </RemixLinkText>
                </p>
              </li>
            );
          })}

          <li>
            <RemixLink
              to="/login"
              className="card hover:card-hover flex flex-col space-y-4 border-dashed"
            >
              <div className="grow">
                <h3>Add your note</h3>
              </div>
            </RemixLink>
          </li>
        </ul>
      </section>
    </div>
  );
}
