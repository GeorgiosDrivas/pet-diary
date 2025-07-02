import { z } from "zod";

export const noteSchema = z.object({
  id: z
    .number()
    .int("Age must be a whole number")
    .positive("Age must be a positive number"),
  name: z.string().min(3, "Note name must be at least 3 characters long"),
  content: z.string().min(5, "Note content must be at least 5 characters long"),
});

export type noteSchemaType = z.infer<typeof noteSchema>;
