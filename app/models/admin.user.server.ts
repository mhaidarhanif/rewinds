import { prisma } from "~/libs";
import { publicUserRoleFields } from "~/models";

import type { User } from "@prisma/client";

export const adminUser = {
  async getUserCount() {
    return prisma.user.count();
  },

  async getAllUsers() {
    return prisma.user.findMany({
      include: {
        role: { select: publicUserRoleFields },
        notes: {
          select: {
            id: true,
          },
        },
      },
    });
  },

  async getUser({ id }: Pick<User, "id">) {
    return prisma.user.findFirst({
      where: { id },
      include: {
        profile: true,
        notes: true,
      },
    });
  },

  async deleteAllUsers() {
    return prisma.user.deleteMany();
  },
};
