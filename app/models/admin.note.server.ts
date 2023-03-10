import { prisma } from "~/libs";

export const adminNote = {
  async getAllNotes() {
    return prisma.note.findMany({
      include: {
        user: true,
      },
    });
  },
};
