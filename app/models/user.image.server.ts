import { prisma } from "~/libs";
import { model } from "~/models";

import type { Image, User } from "@prisma/client";

export const query = {
  count({ user }: { user: Pick<User, "id"> }) {
    return prisma.image.count({
      where: { userId: user.id },
    });
  },
  getAll({ user }: { user: Pick<User, "id"> }) {
    return prisma.image.findMany({
      where: { userId: user.id },
      include: { user: { select: model.user.fields.private } },
      orderBy: { updatedAt: "desc" },
    });
  },
  getById({ id, userId }: Pick<Image, "id" | "userId">) {
    return prisma.image.findFirst({
      where: { id, userId },
      include: { user: { select: model.user.fields.public } },
    });
  },
};

export const mutation = {
  create({
    image,
    user,
  }: {
    image: Pick<Image, "url">;
    user: Pick<User, "id">;
  }) {
    return prisma.image.create({
      data: {
        url: image.url,
        userId: user.id,
      },
    });
  },
  update({
    image,
    user,
  }: {
    image: Pick<Image, "id" | "slug" | "title" | "description" | "content">;
    user: Pick<User, "id">;
  }) {
    return prisma.image.updateMany({
      where: {
        id: image.id,
        userId: user.id,
      },
      data: {
        slug: updateImageSlug(image),
        title: image.title.trim(),
        description: image.description.trim(),
        content: image.content.trim(),
      },
    });
  },
  deleteAll({ user }: { user: Pick<User, "id"> }) {
    return prisma.image.deleteMany({
      where: { userId: user.id },
    });
  },
  deleteById({ id, userId }: Pick<Image, "id" | "userId">) {
    return prisma.image.deleteMany({
      where: {
        id,
        userId,
      },
    });
  },
};
