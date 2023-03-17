import { prisma } from "~/libs";

import type { User } from "@prisma/client";

export const adminUser = {
  async getAllUsers() {
    return prisma.user.findMany({
      include: {
        role: true,
        notes: true,
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

  async getFirstAdminUser() {
    return prisma.user.findFirst({
      where: {
        role: {
          symbol: {
            contains: "ADMIN",
          },
        },
      },
      include: {
        role: true,
        notes: true,
      },
    });
  },
};
