import bcrypt from "bcryptjs";

import { createUsername } from "~/helpers";
import { prisma } from "~/libs";
import { invariant } from "~/utils";

import type { UserPassword, User } from "@prisma/client";
export type { User } from "@prisma/client";

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
      username: username || createUsername(name),
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
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
