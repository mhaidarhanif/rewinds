import bcrypt from "bcryptjs";

import { prisma } from "~/libs";

import type { z } from "zod";
import type { schemaUserUpdatePassword } from "~/schemas";
export type { User } from "@prisma/client";

export const query = {
  count() {
    return prisma.userPassword.count();
  },
};

export const mutation = {
  async update({ id, password }: z.infer<typeof schemaUserUpdatePassword>) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id },
      data: {
        password: {
          update: {
            hash: hashedPassword,
          },
        },
      },
    });

    if (!user) {
      return {
        error: { password: `Password is failed to change` },
      };
    }

    return {
      user,
      error: null,
    };
  },
};
