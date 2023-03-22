import { prisma } from "~/libs";
import { publicUserFields } from "~/models";

import type { User } from "@prisma/client";

export const userNoteModel = {
  getNoteCount({ user }: { user: Pick<User, "id"> }) {
    return prisma.note.count({
      where: { userId: user.id },
    });
  },

  getAllNotes({ user }: { user: Pick<User, "id"> }) {
    return prisma.note.findMany({
      where: { userId: user.id },
      include: { user: { select: publicUserFields } },
      orderBy: { updatedAt: "desc" },
    });
  },

  deleteAllNotes({ user }: { user: Pick<User, "id"> }) {
    return prisma.note.deleteMany({
      where: { userId: user.id },
    });
  },
};
