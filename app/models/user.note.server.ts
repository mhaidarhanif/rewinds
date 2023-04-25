import { createNoteSlug, updateNoteSlug } from "~/helpers";
import { prisma } from "~/libs";
import { model } from "~/models";

import type { Note, User } from "@prisma/client";
import type { FileInfo } from "@uploadcare/react-widget";

export const query = {
  count({ user }: { user: Pick<User, "id"> }) {
    return prisma.note.count({
      where: { userId: user.id },
    });
  },
  getAll({ user }: { user: Pick<User, "id"> }) {
    return prisma.note.findMany({
      where: { userId: user.id },
      include: { user: { select: model.user.fields.private } },
      orderBy: { updatedAt: "desc" },
    });
  },
  getById({ id, userId }: Pick<Note, "id" | "userId">) {
    return prisma.note.findFirst({
      where: { id, userId },
      include: { user: { select: model.user.fields.public } },
    });
  },
};

export const mutation = {
  create({
    user,
    note,
    files,
  }: {
    user: Pick<User, "id">;
    note: Pick<Note, "title" | "description" | "content">;
    files: FileInfo[];
  }) {
    return prisma.note.create({
      data: {
        slug: createNoteSlug(note),
        title: note.title.trim(),
        description: note.description.trim(),
        content: note.content.trim(),
        userId: user.id,
        images: {
          create: files.map((file) => {
            return {
              url: String(file.cdnUrl),
              userId: user.id,
            };
          }),
        },
      },
    });
  },
  update({
    note,
    user,
  }: {
    note: Pick<Note, "id" | "slug" | "title" | "description" | "content">;
    user: Pick<User, "id">;
  }) {
    return prisma.note.updateMany({
      where: {
        id: note.id,
        userId: user.id,
      },
      data: {
        slug: updateNoteSlug(note),
        title: note.title.trim(),
        description: note.description.trim(),
        content: note.content.trim(),
      },
    });
  },
  deleteAll({ user }: { user: Pick<User, "id"> }) {
    return prisma.note.deleteMany({
      where: { userId: user.id },
    });
  },
  deleteById({ id, userId }: Pick<Note, "id" | "userId">) {
    return prisma.note.deleteMany({
      where: {
        id,
        userId,
      },
    });
  },
};
