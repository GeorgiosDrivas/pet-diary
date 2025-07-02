import { z } from "zod";

export const noteSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(3, "Note name is recuired and must be at least 3 characters long"),
  content: z
    .string()
    .min(5, "Note content is required and must be at least 5 characters long"),
});
