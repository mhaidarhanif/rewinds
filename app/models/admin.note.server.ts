import { createNoteSlug, updateNoteSlug } from "~/helpers";
import { prisma } from "~/libs";
import { model } from "~/models";

import type { Note, User } from "@prisma/client";

export const query = {
  count() {
    return prisma.note.count();
  },
  getAll() {
    return prisma.note.findMany({
      include: { user: { select: model.user.fields.public } },
      orderBy: { updatedAt: "desc" },
    });
  },
  getById({ id }: Pick<Note, "id">) {
    return prisma.note.findFirst({
      where: { id },
      include: { user: { select: model.user.fields.public } },
    });
  },
};

export const mutation = {
  create({
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
    note,
  }: {
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
  deleteAll() {
    return prisma.note.deleteMany();
  },
  deleteById({ id }: Pick<Note, "id">) {
    return prisma.note.delete({
      where: { id },
    });
  },
};
