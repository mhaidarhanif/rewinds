import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Alert, Debug } from "~/components";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const noteCategories: string[] = [];
  return json({ noteCategories });
}

export default function Route() {
  const { noteCategories } = useLoaderData<typeof loader>();

  return (
    <div className="stack">
      <Alert variant="warning">Under development</Alert>

      <header>
        <span>All Note Categories</span>
      </header>

      {noteCategories.length <= 0 && (
        <span>No note categories. Please add.</span>
      )}

      <Debug name="noteCategories">{noteCategories}</Debug>
    </div>
  );
}
