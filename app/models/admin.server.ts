import { prisma } from "~/libs";
import { configAdmin } from "~/configs";

export const query = {
  async getMetrics() {
    const counts = await prisma.$transaction([
      prisma.user.count(),
      prisma.image.count(),
      prisma.note.count(),
    ]);

    const metrics = configAdmin.navItems
      .filter((item) => item.isMetric)
      .map((item, index) => {
        return { ...item, count: counts[index] };
      });

    return metrics;
  },
};
