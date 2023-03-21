import { z } from "zod";

export const schemaUserRegister = z.object({
  name: z
    .string({ required_error: "Full Name is required" })
    .min(1, "Full Name at least 1 character")
    .max(50, "Full Name limited to 50 characters"),
  username: z
    .string({ required_error: "Username is required" })
    .regex(/^[a-zA-Z0-9_]+$/, "Only alphabet, number, underscore allowed")
    .min(5, "Username at least 5 characters")
    .max(20, "Username limited to 20 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password length at least 8 characters")
    .max(100, "Password length limited to 100 characters"),
});

export const schemaUserLogin = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password length at least 8 characters"),
});
