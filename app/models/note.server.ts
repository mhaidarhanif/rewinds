import { prisma } from "~/libs";
import { publicUserFields } from "~/models";

import type { Note } from "@prisma/client";

export const note = {
  async getAllNotes() {
    return prisma.note.findMany({
      where: { isPublished: true },
      include: { user: { select: publicUserFields } },
      orderBy: { updatedAt: "desc" },
    });
  },

  async getNoteBySlug({ slug }: Pick<Note, "slug">) {
    return prisma.note.findFirst({
      where: { slug },
      include: { user: true },
    });
  },
};
