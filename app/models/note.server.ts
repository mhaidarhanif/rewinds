import { prisma } from "~/libs";

import type { User, Note } from "@prisma/client";

export function getNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return prisma.note.findFirst({
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      content: true,
    },
    where: {
      id,
      userId,
    },
  });
}

export function getNoteListItems({ userId }: { userId: User["id"] }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createNote({
  slug,
  title,
  description = "",
  content = "",
  userId,
}: Pick<Note, "slug" | "title" | "description" | "content"> & {
  userId: User["id"];
}) {
  return prisma.note.create({
    data: {
      slug,
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
}

export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}
