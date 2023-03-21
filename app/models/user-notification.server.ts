import { prisma } from "~/libs";

import type { User } from "@prisma/client";

export const userNotification = {
  getAllUserNotifications(userId: User["id"]) {
    return prisma.userNotification.findMany({
      where: { userId },
    });
  },

  getLatestUserNotifications(userId: User["id"]) {
    return prisma.userNotification.findMany({
      where: { userId },
      take: 10,
    });
  },
};
