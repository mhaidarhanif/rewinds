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
  deleteAll() {
    return prisma.user.deleteMany();
  },
  deleteById({ id }: Pick<User, "id">) {
    return prisma.user.delete({
      where: { id },
    });
  },
  update({ user }: { user: Pick<User, "id" | "name" | "username" | "email"> }) {
    return prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  },
};
