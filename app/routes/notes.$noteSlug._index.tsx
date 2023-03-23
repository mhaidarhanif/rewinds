import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Balancer } from "~/components";
import { model } from "~/models";
import { createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  invariant(
    params.noteSlug,
    `note with slug ${params.noteSlug} does not exist`
  );

  return json({
    note: await model.note.query.getBySlug({ slug: params.noteSlug }),
  });
}

// Similar with "admin-notes-edit"
export default function NotesViewRoute() {
  const { note } = useLoaderData<typeof loader>();

  if (!note) {
    return <p>Note does not exist or maybe still unpublished.</p>;
  }

  return (
    <div>
      <article className="prose-config mx-auto mt-10">
        <h1>
          <Balancer>{note.title}</Balancer>
        </h1>
        <h2>{note.description}</h2>

        <div className="prose-config whitespace-pre-wrap sm:prose-xl sm:py-4">
          {note.content}
        </div>
      </article>
    </div>
  );
}
