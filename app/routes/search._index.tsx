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

  const notesCount = notes.length;
  const usersCount = users.length;
  const itemsCount = notesCount + usersCount;

  return json(
    { q, notes, notesCount, users, usersCount, itemsCount },
    { headers: createCacheHeaders(request) }
  );
}

export default function Route() {
  const { q, notes, notesCount, users, usersCount, itemsCount } =
    useLoaderData<typeof loader>();

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
      <section className="stack-xl">
        {itemsCount <= 0 && <h3>Sorry, nothing found.</h3>}

        {notes.length > 0 && (
          <div className="stack">
            <span>{formatPluralItems("Note", notesCount)}</span>
            <ul className="stack">
              {notes.map((note) => {
                return (
                  <li key={note.id}>
                    <RemixLink
                      prefetch="intent"
                      to={`/${note.user.username}/${note.slug}`}
                      className="card hover:card-hover stack-sm h-full"
                    >
                      <h3>{note.title}</h3>
                      <p>{truncateText(note.content)}</p>
                      <div className="queue-center-sm dim">
                        <AvatarAuto user={note.user} className="size-md" />
                        <span>{note.user.name}</span>
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
            <span>{formatPluralItems("User", usersCount)}</span>
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
