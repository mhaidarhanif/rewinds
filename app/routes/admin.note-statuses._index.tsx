import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Alert, Debug } from "~/components";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const noteStatuses: string[] = [];
  return json({ noteStatuses });
}

export default function Route() {
  const { noteStatuses } = useLoaderData<typeof loader>();

  return (
    <div className="stack">
      <Alert variant="warning">Under development</Alert>

      <header>
        <span>All Note Statuses</span>
      </header>

      {noteStatuses.length <= 0 && <span>No note statuses. Please add.</span>}

      <Debug name="noteStatuses">{noteStatuses}</Debug>
    </div>
  );
}
