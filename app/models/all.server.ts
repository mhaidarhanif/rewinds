import { configAdminNavigationItems } from "~/configs";
import { prisma } from "~/libs";

export const all = {
  async getAllDataCount() {
    const counts = await prisma.$transaction([
      prisma.user.count(),
      prisma.note.count(),
    ]);
    return configAdminNavigationItems.map((item, index) => {
      return {
        ...item,
        count: counts[index],
      };
    });
  },
};
