import { z } from "zod";

const id = z.string({ required_error: "Existing id is required" });

const name = z
  .string({ required_error: "Full Name is required" })
  .min(1, "Full Name at least 1 character")
  .max(50, "Full Name limited to 50 characters");

const username = z
  .string({ required_error: "Username is required" })
  .regex(/^[a-zA-Z0-9_]+$/, "Only alphabet, number, underscore allowed")
  .min(4, "Username at least 4 characters")
  .max(20, "Username limited to 20 characters");

const email = z
  .string({ required_error: "Email is required" })
  .email("Email is invalid");

const password = z
  .string({ required_error: "Password is required" })
  .min(8, "Password length at least 8 characters")
  .max(100, "Password length limited to 100 characters");

const roleSymbol = z.string({ required_error: "Role is required" });

const headline = z
  .string()
  .max(50, "Headline limited to 50 characters")
  .optional();

const bio = z.string().max(280, "Bio limited to 280 characters").optional();

export const schemaUserRegister = z.object({
  name,
  username,
  email,
  password,
});

export const schemaUserLogin = z.object({
  email,
  password,
});

export const schemaUserUpdateData = z.object({
  id,
  name,
  username,
  email,
});

export const schemaUserUpdateProfile = z.object({
  id,
  headline,
  bio,
});

export const schemaUserUpdatePassword = z.object({
  id,
  password,
});

export const schemaAdminUserUpdate = z.object({
  id,
  name,
  username,
  email,
  roleSymbol,
});
