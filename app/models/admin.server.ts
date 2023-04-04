import { prisma } from "~/libs";

export const query = {
  async getMetrics() {
    const counts = await prisma.$transaction([
      prisma.user.count(),
      prisma.userProfile.count(),
      prisma.userAvatarImage.count(),
      prisma.userCoverImage.count(),
      prisma.userRole.count(),
      prisma.note.count(),
      prisma.noteImage.count(),
      prisma.image.count(),
    ]);
    return counts;
  },
};
