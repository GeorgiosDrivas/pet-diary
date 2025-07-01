import { z } from "zod";

export const petSchema = z.object({
  name: z.string(),
  species: z.string(),
  breed: z.string(),
  age: z.string(),
});

export type PetFormData = z.infer<typeof petSchema>;
