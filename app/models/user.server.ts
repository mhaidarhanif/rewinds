import bcrypt from "bcryptjs";
import { AuthorizationError as RemixAuthError } from "remix-auth";

import { prisma } from "~/libs";
import { invariant } from "~/utils";

import type { UserPassword, User } from "@prisma/client";
export type { User } from "@prisma/client";

export const publicUserFields = {
  id: true,
  name: true,
  username: true,
  role: true,
};

export const privateUserFields = {
  ...publicUserFields,
  email: true,
  phone: true,
  profile: true,
  notes: true,
};

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser({
  name,
  username,
  email,
  password,
}: Pick<User, "name" | "username" | "email"> & {
  password: string; // because it's not inside User model
}) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const defaultUserRole = await prisma.userRole.findFirst({
    where: { symbol: "NORMAL" },
  });
  invariant(defaultUserRole, "User Role with symbol NORMAL is not found");

  return prisma.user.create({
    data: {
      name,
      username,
      email,
      password: { create: { hash: hashedPassword } },
      role: { connect: { id: defaultUserRole.id } },
      profile: {
        create: { headline: "I am new here", bio: "My profile bio." },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: UserPassword["hash"]
) {
  if (!email) throw new RemixAuthError("Email diperlukan");
  if (!password) throw new RemixAuthError("Password diperlukan");

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
      role: true,
    },
  });

  if (!user || !user.password) {
    throw new RemixAuthError("Email tidak ditemukan");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password.hash);

  if (!isPasswordCorrect) {
    throw new RemixAuthError("Password salah");
  }

  // To make sure we only have the essential data in the session
  // Without any other sensitive information
  return {
    id: user.id,
  };
}
