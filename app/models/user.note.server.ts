import { createNoteSlug, updateNoteSlug } from "~/helpers";
import { prisma } from "~/libs";
import { model } from "~/models";

import type { Note, User } from "@prisma/client";

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
};

export const mutation = {
  addNew({
    user,
    note,
  }: {
    user: Pick<User, "id">;
    note: Pick<Note, "title" | "description" | "content">;
  }) {
    return prisma.note.create({
      data: {
        user: { connect: { id: user.id } },
        slug: createNoteSlug(note),
        title: note.title.trim(),
        description: note.description.trim(),
        content: note.content.trim(),
      },
    });
  },
  update({
    user,
    note,
  }: {
    user: Pick<User, "id">;
    note: Pick<Note, "id" | "slug" | "title" | "description" | "content">;
  }) {
    return prisma.note.update({
      where: {
        id: note.id,
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
  deleteById({ id }: Pick<Note, "id">) {
    return prisma.note.delete({
      where: { id },
    });
  },
};
