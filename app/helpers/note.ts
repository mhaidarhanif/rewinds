import { createNanoID, createSlug } from "~/utils";

import type { Note, User } from "@prisma/client";

export function createNoteSlug({
  title,
  username,
}: {
  title: Note["title"];
  username: User["username"];
}) {
  const slug = createSlug(title);
  const nanoid = createNanoID();
  return `${slug}-${username}-${nanoid}`;
}
