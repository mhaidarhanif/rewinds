import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Debug } from "~/components";
import { adminNote } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const notes = await adminNote.getAllNotes();
  return json({ notes });
}

export default function AdminNotesRoute() {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <div data-id="admin-notes">
      <h2>Notes</h2>
      <p>Notes content</p>

      <Debug name="notes">{notes}</Debug>
    </div>
  );
}
