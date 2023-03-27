import usersSeedJSON from "./users-seed.json";
import usersUnallowedJSON from "./users-unallowed.json";

import type { User } from "@prisma/client";

type UserSeed = Pick<User, "name" | "email">;
type UserUsername = Pick<User, "username">;
type Username = User["username"];

export const dataUsers: UserSeed[] = usersSeedJSON;

// Only unallowed for public, not seeder function
export const dataUnallowedUsernames: Username[] = usersUnallowedJSON;

// TODO: Can be stored in database later but still generated from here
export const dataUnallowedUserUsernames: UserUsername[] =
  dataUnallowedUsernames.map((username) => {
    return { username };
  });
