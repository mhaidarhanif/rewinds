import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Alert, Debug } from "~/components";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const noteTags: string[] = [];
  return json({ noteTags });
}

export default function Route() {
  const { noteTags } = useLoaderData<typeof loader>();

  return (
    <div className="stack">
      <Alert variant="warning">Under development</Alert>

      <header>
        <span>All Note Tags</span>
      </header>

      {noteTags.length <= 0 && <span>No note tags. Please add.</span>}

      <Debug name="noteTags">{noteTags}</Debug>
    </div>
  );
}
