import { prisma } from "~/libs";

export const adminUser = {
  async getAllUsers() {
    return prisma.user.findMany({
      include: {
        role: true,
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
