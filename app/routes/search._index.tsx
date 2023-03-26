import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Layout, PageHeader, RemixLink } from "~/components";
import { prisma } from "~/libs";
import { model } from "~/models";
import {
  createCacheHeaders,
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

  const [notes, users] = await prisma.$transaction([
    model.note.query.search({ q }),
    model.user.query.search({ q }),
  ]);
  const itemsCount = notes.length + users.length;

  return json(
    { q, notes, users, itemsCount },
    { headers: createCacheHeaders(request) }
  );
}

export default function Route() {
  const { q, notes, users, itemsCount } = useLoaderData<typeof loader>();

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="xs">
          <h1>Search results</h1>
          <h2>
            <span>{formatPluralItems("item", itemsCount)} found </span>
            {q && <span>with keyword: {q}</span>}
            {!q && <span>with no specific keyword</span>}
          </h2>
        </PageHeader>
      }
    >
      <section className="space-y-4">
        {itemsCount <= 0 && <h3>Sorry, nothing found.</h3>}

        {notes.length > 0 && (
          <div className="space-y-2">
            <h3>Notes</h3>
            <ul className="space-y-1">
              {notes.map((note) => {
                return (
                  <li key={note.id}>
                    <RemixLink
                      prefetch="intent"
                      to={`/${note.user.username}/${note.slug}`}
                      className="card-sm hover:card-hover"
                    >
                      <h4>{note.title}</h4>
                      <p>{truncateText(note.content)}</p>
                    </RemixLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {users.length > 0 && (
          <div className="space-y-2">
            <h3>Users</h3>
            <ul className="space-y-1">
              {users.map((user) => {
                return (
                  <li key={user.id}>
                    <RemixLink
                      prefetch="intent"
                      to={`/${user.username}`}
                      className="card-sm hover:card-hover"
                    >
                      <h4>{user.name}</h4>
                      <p>@{user.username}</p>
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