import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { AvatarAuto, Layout, PageHeader, RemixLink } from "~/components";
import { prisma } from "~/libs";
import { model } from "~/models";
import {
  createCacheHeaders,
  createMetaData,
  createSitemap,
  formatPluralItems,
  formatRelativeTime,
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
      containSize="sm"
      layoutHeader={
        <PageHeader
          size="xs"
          containSize="sm"
          withContainer={false}
          withBackground={false}
          withMarginBottom={false}
        >
          <h1>Search results</h1>
          <h2>
            <span>{formatPluralItems("result", itemsCount)}</span>
            {q && <span> with keyword: {q}</span>}
            {!q && <span> with no specific keyword</span>}
          </h2>
        </PageHeader>
      }
    >
      <section className="space-y-4">
        {itemsCount <= 0 && <h3>Sorry, nothing found.</h3>}

        {notes.length > 0 && (
          <div className="space-y-2">
            <span>Notes</span>
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
                      <div className="queue-center dim">
                        <AvatarAuto user={note.user} className="size-md" />
                        <b>{note.user.name}</b>
                        <span>•</span>
                        <span>{formatRelativeTime(note.updatedAt)}</span>
                      </div>
                    </RemixLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {users.length > 0 && (
          <div className="space-y-2">
            <span>Users</span>
            <ul className="space-y-1">
              {users.map((user) => {
                return (
                  <li key={user.id}>
                    <RemixLink
                      prefetch="intent"
                      to={`/${user.username}`}
                      className="card-sm hover:card-hover queue-center"
                    >
                      <AvatarAuto user={user} className="size-xl" />
                      <div className="space-y-0">
                        <h5>{user.name}</h5>
                        <p>@{user.username}</p>
                      </div>
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
