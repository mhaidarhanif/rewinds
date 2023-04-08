import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { model } from "~/models";
import { createCacheHeaders } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const notes = await model.note.query.getAll();
  const notesCount = notes.length;
  return json({ notes, notesCount }, { headers: createCacheHeaders(request) });
}
