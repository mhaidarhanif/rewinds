import { configAdmin } from "~/configs";
import { prisma } from "~/libs";

export const admin = {
  async getMetrics() {
    const counts = await prisma.$transaction([
      prisma.user.count(),
      prisma.note.count(),
    ]);

    return configAdmin.navItems.map((item, index) => {
      return {
        ...item,
        count: counts[index],
      };
    });
  },
};
