import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { notFound } from "remix-utils";

import { Balancer, Layout, RemixLink, TooltipAuto } from "~/components";
import { model } from "~/models";
import {
  createCacheHeaders,
  createSitemap,
  formatDateTime,
  formatRelativeTime,
  invariant,
} from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.noteSlug, `noteSlug does not exist`);
  invariant(params.username, `username does not exist`);

  // Check 2 things because we won't allow the correct note slug
  // but with the wrong user
  const note = await model.note.query.getBySlugAndUsername({
    slug: params.noteSlug,
    username: params.username,
  });
  if (!note) {
    throw notFound("Note not found");
  }

  return json({ note }, { headers: createCacheHeaders(request, 60) });
}

/**
 * Similar with /notes/$noteSlug but fancier
 */
export default function UsernameNoteSlugViewRoute() {
  const { note } = useLoaderData<typeof loader>();

  // TODO: Can have custom background cover like on dev.to
  return (
    <Layout
      isSpaced
      layoutHeader={
        <header className="mb-4 bg-surface-100 py-6 dark:bg-surface-800/20 sm:py-10">
          <div className="contain-sm space-y-4">
            <h1>
              <Balancer>{note.title}</Balancer>
            </h1>
            <h2>{note.description}</h2>
          </div>
        </header>
      }
    >
      <aside className="contain-sm">
        <h3>
          <RemixLink to={`/${note.user.username}`}>{note.user.name}</RemixLink>
        </h3>
        <div className="flex gap-2">
          <TooltipAuto content={<b>{formatDateTime(note.createdAt)}</b>}>
            <span>Posted </span>
            <b>{formatRelativeTime(note.createdAt)}</b>
          </TooltipAuto>
          <span>·</span>
          <TooltipAuto content={<b>{formatDateTime(note.updatedAt)}</b>}>
            <span>Updated </span>
            <b>{formatRelativeTime(note.updatedAt)}</b>
          </TooltipAuto>
        </div>
      </aside>

      <div className="contain-sm">
        <article className="prose-config whitespace-pre-wrap sm:py-4">
          {note.content}
        </article>
      </div>
    </Layout>
  );
}
