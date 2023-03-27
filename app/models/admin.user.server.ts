import { prisma } from "~/libs";

import { model } from ".";

import type { User, UserRole } from "@prisma/client";

export const query = {
  count() {
    return prisma.user.count();
  },
  getAll() {
    return prisma.user.findMany({
      include: {
        role: { select: { symbol: true, name: true, description: true } },
        notes: { select: { id: true } },
      },
    });
  },
  getById({ id }: Pick<User, "id">) {
    return prisma.user.findFirst({
      where: { id },
      include: {
        role: true,
        profile: true,
        notes: true,
      },
    });
  },
};

export const mutation = {
  deleteAll() {
    return prisma.user.deleteMany();
  },
  deleteById({ id }: Pick<User, "id">) {
    return prisma.user.delete({
      where: { id },
    });
  },
  async update({
    user,
    roleSymbol,
  }: {
    user: Pick<User, "id" | "name" | "username" | "email">;
    roleSymbol: UserRole["symbol"];
  }) {
    const userRole = await model.userRole.query.getBySymbol({
      symbol: roleSymbol,
    });
    if (!userRole) {
      return {
        error: {
          roleSymbol: `User Role Symbol ${roleSymbol} is not available`,
        },
      };
    }

    return prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
        role: { connect: { symbol: roleSymbol } },
      },
    });
  },
};
