import { z } from "zod";

export const schemaNoteNew = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .max(50, "Title max of 50 characters"),
  description: z
    .string({ required_error: "Description is required" })
    .max(100, "Description max of 100 characters"),
  content: z
    .string({ required_error: "Content is required" })
    .max(10_000, "Content length max of 10,000 characters"),
});

export const schemaNoteUpdate = z
  .object({
    id: z.string({ required_error: "Existing id is required" }),
    slug: z.string({ required_error: "Existing slug is required" }),
  })
  .merge(schemaNoteNew);
