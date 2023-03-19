import { createNoteSlug } from "~/helpers";
import { prisma } from "~/libs";
import { publicUserFields } from "~/models";

import type { Note, User } from "@prisma/client";

export const adminNote = {
  async getNoteCount() {
    return prisma.note.count();
  },

  async getAllNotes() {
    return prisma.note.findMany({
      include: { user: { select: publicUserFields } },
      orderBy: { updatedAt: "desc" },
    });
  },

  async getNote({ id }: Pick<Note, "id">) {
    return prisma.note.findFirst({
      where: { id },
      include: { user: true },
    });
  },

  async addNewNote({
    user,
    note,
  }: { user: Pick<User, "id"> } & {
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

  async deleteAllNotes() {
    return prisma.note.deleteMany();
  },

  async deleteNote({ id }: Pick<Note, "id">) {
    return prisma.note.delete({
      where: { id },
    });
  },
};
