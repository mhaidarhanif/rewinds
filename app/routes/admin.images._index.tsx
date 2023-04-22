import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Alert, Debug } from "~/components";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const images: string[] = [];
  return json({ images });
}

export default function Route() {
  const { images } = useLoaderData<typeof loader>();

  return (
    <div className="stack">
      <Alert variant="warning">Under development</Alert>

      <header>
        <span>All Images</span>
      </header>

      {images.length <= 0 && <span>No images.</span>}

      <Debug name="images">{images}</Debug>
    </div>
  );
}
