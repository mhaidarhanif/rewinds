import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Alert, Debug } from "~/components";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const noteImages: string[] = [];
  return json({ noteImages });
}

export default function Route() {
  const { noteImages } = useLoaderData<typeof loader>();

  return (
    <div className="stack">
      <Alert variant="warning">Under development</Alert>

      <header>
        <span>All Note Images</span>
      </header>

      {noteImages.length <= 0 && <span>No note images. Please add.</span>}

      <Debug name="noteImages">{noteImages}</Debug>
    </div>
  );
}
