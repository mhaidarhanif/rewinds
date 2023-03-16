import { configAdmin } from "~/configs";
import { prisma } from "~/libs";

export const admin = {
  async getAllDataCount() {
    const counts = await prisma.$transaction([
      prisma.user.count(),
      prisma.note.count(),
    ]);

    return configAdmin.navigationItems.map((item, index) => {
      return {
        ...item,
        count: counts[index],
      };
    });
  },
};
