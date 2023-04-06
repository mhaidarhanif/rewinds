import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

import { configUser } from "~/configs";
import { dataUnallowedUserUsernames } from "~/data";
import { prisma } from "~/libs";
import { createNanoID, invariant } from "~/utils";

import type { User } from "@prisma/client";
import type { z } from "zod";
import type { schemaUserUpdateData } from "~/schemas";
export type { User } from "@prisma/client";

export const fields = {
  public: {
    id: true,
    name: true,
    username: true,
    role: { select: { symbol: true, name: true, description: true } },
    profile: { select: { headline: true, bio: true } },
  },
  private: {
    id: true,
    name: true,
    username: true,
    role: { select: { symbol: true, name: true, description: true } },
    email: true,
    phone: true,
    profile: true,
    notes: true,
  },
};

export const query = {
  count() {
    return prisma.user.count();
  },
  getAllUsernames() {
    return prisma.user.findMany({
      select: {
        id: true,
        username: true,
        updatedAt: true,
      },
    });
  },
  getForSession({ id }: Pick<User, "id">) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: { select: { symbol: true, name: true } },
        profile: {
          select: {
            id: true,
            headline: true,
            bio: true,
          },
        },
      },
    });
  },
  getById({ id }: Pick<User, "id">) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        profile: true,
        notes: true,
      },
    });
  },
  getByUsername({ username }: Pick<User, "username">) {
    return prisma.user.findUnique({
      where: { username },
      include: {
        role: true,
        profile: true,
        notes: {
          orderBy: { updatedAt: "desc" },
        },
      },
    });
  },
  getByEmail({ email }: Pick<User, "email">) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  },
  search({ q }: { q: string | undefined }) {
    return prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          {
            username: { contains: q },
          },
        ],
      },
      select: fields.public,
      orderBy: [{ role: { sequence: "asc" } }, { name: "asc" }],
    });
  },
  async getMetrics({ id }: Pick<User, "id">) {
    const metrics = await prisma.$transaction([
      prisma.note.count({ where: { userId: id } }),
    ]);

    return configUser.navigationItems.map((item, index) => {
      return {
        ...item,
        id: createNanoID(),
        count: metrics[index],
      };
    });
  },
};

export const mutation = {
  async register({
    name,
    username,
    email,
    password,
  }: Pick<User, "name" | "username" | "email"> & {
    password: string; // unencrypted password at first
  }) {
    const nameIsUnallowed = dataUnallowedUserUsernames.find(
      (user) => name.toLowerCase() === user.username
    );
    if (nameIsUnallowed) {
      return { error: { name: `Name ${name} is not allowed` } };
    }

    const usernameIsUnallowed = dataUnallowedUserUsernames.find(
      (user) => username.toLowerCase() === user.username
    );
    if (usernameIsUnallowed) {
      return { error: { username: `Username ${username} is not allowed` } };
    }

    const userUsername = await prisma.user.findUnique({
      where: { username: username.trim() },
    });
    if (userUsername) {
      return { error: { username: `Username ${username} is already taken` } };
    }

    const userEmail = await prisma.user.findUnique({
      where: { email: email.trim() },
      include: { password: true },
    });

    if (userEmail) {
      return { error: { email: `Email ${email} is already used` } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultUserRole = await prisma.userRole.findFirst({
      where: { symbol: "NORMAL" },
    });
    invariant(defaultUserRole, "User Role with symbol NORMAL is not found");

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
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

    return {
      user,
      error: null,
    };
  },
  async login({
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
      return {
        error: { email: `Email ${email} is not registered yet`, password: "" },
      };
    }
    if (!user.password) {
      return { error: { email: "User account has no password", password: "" } };
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
  deleteById({ id }: Pick<User, "id">) {
    return prisma.user.delete({ where: { id } });
  },
  deleteByEmail({ email }: Pick<User, "email">) {
    return prisma.user.delete({ where: { email } });
  },
  async update({
    id,
    name,
    username,
    email,
  }: z.infer<typeof schemaUserUpdateData>) {
    const nameIsUnallowed = dataUnallowedUserUsernames.find(
      (user) => name.toLowerCase() === user.username
    );
    if (nameIsUnallowed) {
      return { error: { name: `Name ${name} is not allowed` } };
    }

    const usernameIsUnallowed = dataUnallowedUserUsernames.find(
      (user) => username.toLowerCase() === user.username
    );
    if (usernameIsUnallowed) {
      return { error: { username: `Username ${username} is not allowed` } };
    }

    try {
      const user = await prisma.user.update({
        where: { id },
        data: { name, username, email },
      });

      return {
        user,
        error: null,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return {
          error: {
            username: `Username ${username} might already taken`,
            email: `Email ${email} might already used`,
          },
        };
      }
    }
  },
};
