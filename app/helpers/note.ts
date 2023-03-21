import { createNanoID, createSlug } from "~/utils";

import type { Note } from "@prisma/client";

export function createNoteSlug({ title }: Pick<Note, "title">) {
  const slug: string = createSlug(title);
  const nanoID: string = createNanoID();

  return `${slug}-${nanoID}`;
}

/**
 * Update slug still retain the existing nano ID
 * Although this could be refactored to use slugId from the Prisma model/table field
 * But this way is more efficient to think only 1 data point instead of 2
 */
export function updateNoteSlug({ slug, title }: Pick<Note, "slug" | "title">) {
  // Get the last string part after the last "-"
  const splittedSlug: string[] = slug.split("-");
  const existingNanoID: string = splittedSlug[splittedSlug.length - 1];

  // Assume the title has changed
  const newSlug: string = createSlug(title);

  // If the previous slug was broken, fix it
  if (existingNanoID == undefined) {
    const nanoID: string = createNanoID();
    return `${newSlug}-${nanoID}`;
  } else {
    return `${newSlug}-${existingNanoID}`;
  }
}
