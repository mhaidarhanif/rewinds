import type { User } from "@prisma/client";

type SeedUser = Pick<User, "name" | "email">;

export const dataUsers: SeedUser[] = [
  {
    name: "Regular User",
    email: "user@example.com",
  },
];
