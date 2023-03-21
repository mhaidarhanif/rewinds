import { z } from "zod";

export const schemaNote = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1000, "Content length max of 1000 characters"),
});
