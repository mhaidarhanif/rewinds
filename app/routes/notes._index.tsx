import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Balancer, PageHeader, RemixLink } from "~/components";
import { noteModel } from "~/models";
import { createMetaData, truncateText } from "~/utils";

export const meta = createMetaData({
  title: "Notes",
  description: "Public notes created by the community.",
});

export async function loader() {
  const notes = await noteModel.getAllNotes();
  return json({ notes });
}

export default function NotesIndexRoute() {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <div>
      <PageHeader
        size="sm"
        isTextCentered
        withBackground={false}
        withMarginBottom={false}
      >
        <h1>All Notes</h1>
        <h2>
          <Balancer>All published notes from the users</Balancer>
        </h2>
        <p>
          <Balancer>Frequently changed for this example demo</Balancer>
        </p>
      </PageHeader>

      <section>
        <ul className="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => {
            return (
              <li key={note.slug} className="card hover:card-hover">
                <RemixLink to={note.slug} className="block space-y-1">
                  <h3>{note.title}</h3>
                  <p>{truncateText(note.content)}</p>
                  <p>
                    by <b>{note.user.name}</b>
                  </p>
                </RemixLink>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
