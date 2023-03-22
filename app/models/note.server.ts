import { prisma } from "~/libs";
import { publicUserFields } from "~/models";

import type { Note } from "@prisma/client";

export const noteModel = {
  getAllNotes() {
    return prisma.note.findMany({
      where: { isPublished: true },
      include: { user: { select: publicUserFields } },
      orderBy: { updatedAt: "desc" },
    });
  },

  getNoteBySlug({ slug }: Pick<Note, "slug">) {
    return prisma.note.findFirst({
      where: { slug },
      include: { user: { select: publicUserFields } },
    });
  },

  searchNotes({ q }: { q: string | undefined }) {
    return prisma.note.findMany({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: q } },
          { slug: { contains: q } },
          { description: { contains: q } },
          { content: { contains: q } },
        ],
      },
      include: {
        images: true,
        user: { select: publicUserFields },
      },
      orderBy: [{ updatedAt: "desc" }],
    });
  },
};
