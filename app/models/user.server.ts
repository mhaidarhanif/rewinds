import bcrypt from "bcryptjs";

import { configUser } from "~/configs";
import { prisma } from "~/libs";
import { createNanoID, invariant } from "~/utils";

import type { UserPassword, User } from "@prisma/client";
export type { User } from "@prisma/client";

export const publicUserFields = {
  id: true,
  name: true,
  username: true,
  role: true,
  notes: true,
};

export const privateUserFields = {
  ...publicUserFields,
  email: true,
  phone: true,
  profile: true,
  notes: true,
};

export const userModel = {
  async getAllUserUsernames() {
    return prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
  },

  async getMetrics({ id }: Pick<User, "id">) {
    const metrics = await prisma.$transaction([
      prisma.note.count({ where: { userId: id } }),
    ]);

    return configUser.navigationItems.map((item, index) => {
      return {
        id: createNanoID(),
        ...item,
        count: metrics[index],
      };
    });
  },

  async getUserForSession({ id }: Pick<User, "id">) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        profile: true,
      },
    });
  },

  async getUserById({ id }: Pick<User, "id">) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        profile: true,
        notes: true,
      },
    });
  },

  async getUserByUsername({ username }: Pick<User, "username">) {
    return prisma.user.findUnique({
      where: { username },
      include: {
        role: true,
        profile: true,
        notes: true,
      },
    });
  },

  async getUserByEmail({ email }: Pick<User, "email">) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  },

  async loginUserPassword({
    email,
    password,
  }: {
    email: User["email"];
    password: string; // from the form field, but it is not the hash
  }) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { password: true },
    });

    if (!user) {
      return { error: { email: "Email is not registered yet", password: "" } };
    }
    if (!user.password) {
      return { error: { email: "User has no password", password: "" } };
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password.hash
    );

    if (!isPasswordCorrect) {
      return { error: { email: "", password: "Password is incorrect" } };
    }

    // To make sure we only have the essential data in the session
    // Without any other sensitive information
    return {
      user,
      error: null,
    };
  },

  async registerUserPassword({
    name,
    username,
    email,
    password,
  }: Pick<User, "name" | "username" | "email"> & {
    password: UserPassword["hash"];
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
          create: {
            headline: "I am new here",
            bio: "This is my profile bio.",
          },
        },
      },
    });
  },

  async deleteUserByEmail(email: User["email"]) {
    return prisma.user.delete({ where: { email } });
  },
};
