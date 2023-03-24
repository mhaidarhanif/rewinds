import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Balancer,
  Layout,
  RemixLink,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components";
import { model } from "~/models";
import {
  createSitemap,
  formatDateTime,
  formatRelativeTime,
  invariant,
} from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  invariant(params.noteSlug, `noteSlug does not exist`);
  invariant(params.username, `username does not exist`);

  return json({
    note: await model.note.query.getBySlugAndUsername({
      slug: params.noteSlug,
      username: params.username,
    }),
  });
}

export default function NotesViewRoute() {
  const { note } = useLoaderData<typeof loader>();

  if (!note) {
    return <p>Note does not exist or maybe still unpublished.</p>;
  }

  // TODO: Can have custom background cover like on dev.to
  return (
    <Layout
      isSpaced
      layoutHeader={
        <header className="mb-4 bg-surface-100 py-6 dark:bg-surface-800/20 sm:py-10">
          <div className="contain-sm">
            <h1>
              <Balancer>{note.title}</Balancer>
            </h1>
            <h2>{note.description}</h2>
          </div>
        </header>
      }
    >
      <article className="contain-sm">
        <section>
          <h3>
            <RemixLink to={`/${note.user.username}`}>
              {note.user.name}
            </RemixLink>
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p>
                  <span>Posted </span>
                  <b>{formatRelativeTime(note.createdAt)}</b>
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <b>{formatDateTime(note.createdAt)}</b>
              </TooltipContent>
            </Tooltip>
            <span> · </span>
            <Tooltip>
              <TooltipTrigger>
                <p>
                  <span>Updated </span>
                  <b>{formatRelativeTime(note.updatedAt)}</b>
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <b>{formatDateTime(note.createdAt)}</b>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </section>

        <div className="prose-config whitespace-pre-wrap sm:prose-xl sm:py-4">
          {note.content}
        </div>
      </article>
    </Layout>
  );
}
