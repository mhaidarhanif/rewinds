import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Badge, PageAdminHeader, RemixLink } from "~/components";
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
  title: "Admin search results",
  description: "Could found anything.",
});

export const handle = createSitemap();

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
    <div>
      <PageAdminHeader size="xs" direction="col">
        <h1>Admin search results</h1>
        <h3>
          <span>{formatPluralItems("result", itemsCount)}</span>
          {q && <span> with keyword: {q}</span>}
          {!q && <span> with no specific keyword</span>}
        </h3>
      </PageAdminHeader>

      <section className="px-layout space-y-4">
        {itemsCount <= 0 && <h3>Sorry, nothing found.</h3>}

        {users.length > 0 && (
          <div className="space-y-2">
            <h4>Users</h4>
            <ul className="space-y-1">
              {users.map((user) => {
                return (
                  <li key={user.id}>
                    <RemixLink
                      to={`/admin/users/${user.id}`}
                      prefetch="intent"
                      className="card-sm hover:card-hover"
                    >
                      {user.name} @{user.username}{" "}
                      <Badge>{user.role.name}</Badge>
                    </RemixLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {notes.length > 0 && (
          <div className="space-y-2">
            <h4>Notes</h4>
            <ul className="space-y-1">
              {notes.map((note) => {
                return (
                  <li key={note.id}>
                    <RemixLink
                      prefetch="intent"
                      to={`/admin/notes/${note.id}`}
                      className="card-sm hover:card-hover"
                    >
                      <b>{note.title}</b> · {note.description} ·{" "}
                      {truncateText(note.content, 50)}
                    </RemixLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
