import { prisma } from "~/libs";
import { publicUserFields } from "~/models";

import type { User } from "@prisma/client";

export const userNote = {
  async getAllNotes({ user }: { user: Pick<User, "id"> }) {
    return prisma.note.findMany({
      where: { userId: user.id },
      include: { user: { select: publicUserFields } },
      orderBy: { updatedAt: "desc" },
    });
  },
};
