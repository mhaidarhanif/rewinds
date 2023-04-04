import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { AvatarAuto, Layout, PageHeader, RemixLink } from "~/components";
import { model } from "~/models";
import {
  createCacheHeaders,
  createMetaData,
  createSitemap,
  formatPluralItems,
  formatRelativeTime,
  truncateText,
} from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap("/notes", 0.8);

export const meta = createMetaData({
  title: "Notes",
  description: "Public notes created by the community.",
});

export async function loader({ request }: LoaderArgs) {
  const notes = await model.note.query.getAll();
  const notesCount = notes.length;
  return json({ notes, notesCount }, { headers: createCacheHeaders(request) });
}

export default function Route() {
  const { notes, notesCount } = useLoaderData<typeof loader>();

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader
          size="sm"
          withContainer={false}
          withBackground={false}
          withMarginBottom={false}
          className="contain-sm"
        >
          <h1>All {formatPluralItems("note", notesCount)}</h1>
          <p className="dim">
            Published notes from the users. Frequently changed or reset for this
            example demo.
          </p>
        </PageHeader>
      }
      className="contain-sm"
    >
      <section>
        <ul className="space-y-2">
          {notes.map((note) => {
            return (
              <li key={note.slug}>
                <RemixLink
                  prefetch="intent"
                  to={`/${note.user.username}/${note.slug}`}
                  className="card hover:card-hover flex h-full flex-col space-y-0"
                >
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                  <p className="dim">{truncateText(note.content, 70)}</p>
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
      </section>
    </Layout>
  );
}
