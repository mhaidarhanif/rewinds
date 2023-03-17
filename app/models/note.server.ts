import { prisma } from "~/libs";

import type { User } from "@prisma/client";

export const userNote = {
  async getAllNotes({ user }: { user: Pick<User, "id"> }) {
    return prisma.note.findMany({
      where: { userId: user.id },
      include: { user: true },
      orderBy: { updatedAt: "desc" },
    });
  },
};
