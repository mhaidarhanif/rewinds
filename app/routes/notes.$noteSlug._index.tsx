import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { notFound } from "remix-utils";

import { Balancer } from "~/components";
import { model } from "~/models";
import { createCacheHeaders, createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.noteSlug, `noteSlug does not exist`);

  const note = await model.note.query.getBySlug({ slug: params.noteSlug });
  if (!note) {
    throw notFound("Note not found");
  }

  return json({ note }, { headers: createCacheHeaders(request, 60) });
}

/**
 * Similar with /$username/$noteSlug but simpler
 */
export default function NotesNoteSlugViewRoute() {
  const { note } = useLoaderData<typeof loader>();

  return (
    <div className="contain-sm">
      <article className="prose-config mt-10 whitespace-pre-wrap">
        <header className="pb-10">
          <h1>
            <Balancer>{note.title}</Balancer>
          </h1>
          <h2>{note.description}</h2>
        </header>

        {note.content}
      </article>
    </div>
  );
}
