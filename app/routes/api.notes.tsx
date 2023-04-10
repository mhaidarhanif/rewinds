import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { prisma } from "~/libs";

import { model } from "~/models";
import { createCacheHeaders } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const [notesCount, notes] = await prisma.$transaction([
    model.note.query.getAll(),
    model.note.query.count(),
  ]);

  return json({ notesCount, notes }, { headers: createCacheHeaders(request) });
}
