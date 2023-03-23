import { prisma } from "~/libs";
import { model } from "~/models";

import type { User } from "@prisma/client";

export const query = {
  count({ user }: { user: Pick<User, "id"> }) {
    return prisma.note.count({
      where: { userId: user.id },
    });
  },
  getAll({ user }: { user: Pick<User, "id"> }) {
    return prisma.note.findMany({
      where: { userId: user.id },
      include: { user: { select: model.user.fields.private } },
      orderBy: { updatedAt: "desc" },
    });
  },
};

export const mutation = {
  deleteAll({ user }: { user: Pick<User, "id"> }) {
    return prisma.note.deleteMany({
      where: { userId: user.id },
    });
  },
};
