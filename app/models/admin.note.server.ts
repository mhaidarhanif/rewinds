import { createNoteSlug } from "~/helpers";
import { prisma } from "~/libs";

import type { Note, User } from "@prisma/client";

export const adminNote = {
  async getAllNotes() {
    return prisma.note.findMany({
      include: {
        user: {
          select: { name: true, username: true },
        },
      },
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
  }: { user: Pick<User, "id" | "username"> } & {
    note: Pick<Note, "title" | "description" | "content">;
  }) {
    return prisma.note.create({
      data: {
        slug: createNoteSlug({ title: note.title, username: user.username }),
        title: note.title,
        description: note.description,
        content: note.content,
        user: { connect: { id: user.id } },
      },
    });
  },

  async deleteAllNotes() {
    return prisma.note.deleteMany();
  },
};
