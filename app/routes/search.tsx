import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Layout, PageHeader, RemixLink } from "~/components";
import { note } from "~/models";
import {
  createMetaData,
  createSitemap,
  formatPluralItems,
  getAllSearchQuery,
  truncateText,
} from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const meta = createMetaData({
  title: "Search results",
  description: "Could found some notes or users.",
});

export const handle = createSitemap("/page", 0.9);

export async function loader({ request }: LoaderArgs) {
  const { q } = getAllSearchQuery({ request });

  const notes = await note.searchNotes({ q });

  return json({
    notes,
    q,
  });
}

export default function SearchRoute() {
  const { notes, q } = useLoaderData<typeof loader>();
  const totalItems = notes.length;

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="xs">
          <h1>Search results</h1>
          <h2>
            <span>{formatPluralItems("item", totalItems)} found </span>
            {q && <span>with keyword: {q}</span>}
          </h2>
        </PageHeader>
      }
    >
      <section>
        {!notes && <p>Sorry, nothing found.</p>}

        {notes.length > 0 && (
          <div>
            <h3>Notes:</h3>
            <ul className="flex flex-col gap-4">
              {notes.map((note) => {
                return (
                  <li key={note.slug} className="card hover:card-hover">
                    <RemixLink
                      to={`/notes/${note.slug}`}
                      className="block space-y-1"
                    >
                      <h3>{note.title}</h3>
                      <p>{truncateText(note.content)}</p>
                    </RemixLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>
    </Layout>
  );
}
