import { prisma } from "~/libs";

import type { Note } from "@prisma/client";

export const adminNote = {
  async getAllNotes() {
    return prisma.note.findMany({
      include: {
        user: true,
      },
    });
  },

  async getNote({ id }: Pick<Note, "id">) {
    return prisma.note.findFirst({
      where: { id },
      include: {
        user: true,
      },
    });
  },
};
