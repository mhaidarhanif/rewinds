import { z } from "zod";

const userName = z
  .string({ required_error: "Full Name is required" })
  .min(1, "Full Name at least 1 character")
  .max(50, "Full Name limited to 50 characters");

const userUsername = z
  .string({ required_error: "Username is required" })
  .regex(/^[a-zA-Z0-9_]+$/, "Only alphabet, number, underscore allowed")
  .min(5, "Username at least 5 characters")
  .max(20, "Username limited to 20 characters");

const userEmail = z
  .string({ required_error: "Email is required" })
  .email("Email is invalid");

const userPassword = z
  .string({ required_error: "Password is required" })
  .min(8, "Password length at least 8 characters")
  .max(100, "Password length limited to 100 characters");

export const schemaUserRegister = z.object({
  name: userName,
  username: userUsername,
  email: userEmail,
  password: userPassword,
});

export const schemaUserLogin = z.object({
  email: userEmail,
  password: userPassword,
});

export const schemaAdminUserEdit = z.object({
  id: z.string({ required_error: "Existing id is required" }),
  name: userName,
  username: userUsername,
  email: userEmail,
});
