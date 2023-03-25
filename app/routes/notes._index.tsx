import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { AvatarAuto, Layout, PageHeader, RemixLink } from "~/components";
import { model } from "~/models";
import { createMetaData, formatPluralItems, truncateText } from "~/utils";

export const meta = createMetaData({
  title: "Notes",
  description: "Public notes created by the community.",
});

export async function loader() {
  const notes = await model.note.query.getAll();
  const notesCount = notes.length;
  return json({ notes, notesCount });
}

export default function NotesIndexRoute() {
  const { notes, notesCount } = useLoaderData<typeof loader>();

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="sm" withBackground={false} withMarginBottom={false}>
          <h1>All {formatPluralItems("note", notesCount)}</h1>
          <h2>Published notes from the users</h2>
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
                  to={`/${note.user.username}/${note.slug}`}
                  className="card hover:card-hover flex h-full flex-col space-y-2"
                >
                  <h3>{note.title}</h3>
                  <div className="stack-h-center">
                    <AvatarAuto user={note.user} className="size-md" />
                    <b>{note.user.name}</b>
                  </div>
                  <p>{truncateText(note.content)}</p>
                </RemixLink>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
