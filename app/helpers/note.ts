import { createNanoID, createSlug } from "~/utils";

import type { Note, User } from "@prisma/client";

export function createNoteSlug({
  title,
  username,
  withUsername = false,
}: {
  title: Note["title"];
  username?: User["username"];
  withUsername?: boolean;
}) {
  const slug = createSlug(title);
  const nanoid = createNanoID();

  if (!withUsername) {
    return `${slug}-${nanoid}`;
  }

  return `${slug}-${username}-${nanoid}`;
}
