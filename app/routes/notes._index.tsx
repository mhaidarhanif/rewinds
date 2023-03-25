import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Layout, PageHeader, RemixLink } from "~/components";
import { model } from "~/models";
import { createMetaData, truncateText } from "~/utils";

export const meta = createMetaData({
  title: "Notes",
  description: "Public notes created by the community.",
});

export async function loader() {
  const notes = await model.note.query.getAll();
  return json({ notes });
}

export default function NotesIndexRoute() {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="sm" withBackground={false} withMarginBottom={false}>
          <h1>All Notes</h1>
          <h2>All published notes from the users</h2>
          <p>Frequently changed for this example demo</p>
        </PageHeader>
      }
    >
      <section>
        <ul className="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => {
            return (
              <li key={note.slug}>
                <RemixLink
                  prefetch="intent"
                  to={note.slug}
                  className="card hover:card-hover space-y-1"
                >
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
    </Layout>
  );
}
