import { prisma } from "~/libs";

import type { User } from "@prisma/client";

export const query = {
  async count() {
    return prisma.user.count();
  },

  async getAll() {
    return prisma.user.findMany({
      include: {
        role: { select: { symbol: true, name: true, description: true } },
        notes: { select: { id: true } },
      },
    });
  },

  async getById({ id }: Pick<User, "id">) {
    return prisma.user.findFirst({
      where: { id },
      include: {
        profile: true,
        notes: true,
      },
    });
  },
};

export const mutation = {
  async deleteAll() {
    return prisma.user.deleteMany();
  },
};
