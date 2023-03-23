import { prisma } from "~/libs";
import { model } from "~/models";

import type { Note } from "@prisma/client";

export const query = {
  count() {
    return prisma.note.count();
  },
  getAll() {
    return prisma.note.findMany({
      where: { isPublished: true },
      include: { user: { select: model.user.fields.public } },
      orderBy: { updatedAt: "desc" },
    });
  },
  getBySlug({ slug }: Pick<Note, "slug">) {
    return prisma.note.findFirst({
      where: { slug },
      include: { user: { select: model.user.fields.public } },
    });
  },
  search({ q }: { q: string | undefined }) {
    return prisma.note.findMany({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: q } },
          { slug: { contains: q } },
          { description: { contains: q } },
          { content: { contains: q } },
        ],
      },
      include: {
        images: true,
        user: { select: model.user.fields.public },
      },
      orderBy: [{ updatedAt: "desc" }],
    });
  },
};
