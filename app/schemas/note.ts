import { z } from "zod";

export const schemaNoteNew = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title max of 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Description max of 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(10_000, "Content length max of 10,000 characters"),
});

export const schemaNoteUpdate = z
  .object({
    id: z.string().min(1, "Existing id is required"),
    slug: z.string().min(1, "Existing slug is required"),
  })
  .merge(schemaNoteNew);
