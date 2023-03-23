import { prisma } from "~/libs";

import type { User } from "@prisma/client";

export const query = {
  count() {
    return prisma.userNotification.count();
  },
  getAll({ user }: { user: Pick<User, "id"> }) {
    return prisma.userNotification.findMany({
      where: { userId: user.id },
    });
  },
  getLatest({ user }: { user: Pick<User, "id"> }) {
    return prisma.userNotification.findMany({
      where: { userId: user.id },
      take: 10,
    });
  },
};
