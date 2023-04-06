import { prisma } from "~/libs";

import type { z } from "zod";
import type { schemaUserUpdateProfile } from "~/schemas";
export type { User } from "@prisma/client";

export const fields = {
  public: { headline: true, bio: true },
};

export const query = {
  count() {
    return prisma.user.count();
  },
};

export const mutation = {
  async update({ id, headline, bio }: z.infer<typeof schemaUserUpdateProfile>) {
    const userProfile = await prisma.userProfile.update({
      where: { id },
      data: { headline, bio },
    });

    if (!userProfile) {
      return {
        error: { password: `Profile is failed to change` },
      };
    }

    return {
      userProfile,
      error: null,
    };
  },
};
