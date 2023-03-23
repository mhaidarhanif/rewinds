import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug } from "~/components";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const noteTags: string[] = [];
  return json({ noteTags });
}

export default function AdminNoteTagsRoute() {
  const { noteTags } = useLoaderData<typeof loader>();

  if (noteTags.length <= 0) {
    return <span>No note tags. Please add.</span>;
  }

  return (
    <div className="stack-v">
      <header>
        <span>Note Tags</span>
      </header>

      {noteTags.length <= 0 && <span>No note tags. Please add.</span>}

      <Debug name="noteTags">{noteTags}</Debug>
    </div>
  );
}