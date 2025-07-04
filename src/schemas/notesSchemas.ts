import { z } from "zod";

export const noteSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3, "Note title must be at least 3 characters long"),
  content: z.string().min(5, "Note content must be at least 5 characters long"),
});

export const noteInputSchema = noteSchema.omit({ id: true });

export type noteSchemaType = z.infer<typeof noteSchema>;
export type NoteInput = z.infer<typeof noteInputSchema>;
