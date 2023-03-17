import { prisma } from "~/libs";
import { createSlug } from "~/utils";

import type { Note, User } from "@prisma/client";

export const adminNote = {
  async getAllNotes() {
    return prisma.note.findMany({
      include: {
        user: true,
      },
    });
  },

  async getNote({ id }: Pick<Note, "id">) {
    return prisma.note.findFirst({
      where: { id },
      include: {
        user: true,
      },
    });
  },

  async addNewNote({
    userId,
    title,
    description,
    content,
  }: { userId: User["id"] } & Pick<Note, "title" | "description" | "content">) {
    return prisma.note.create({
      data: {
        slug: createSlug(title),
        title,
        description,
        content,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  },

  async deleteAllNotes() {
    return prisma.note.deleteMany();
  },
};
