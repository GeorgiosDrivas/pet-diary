import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  species: z.string().min(3, "Species must be at least 3 characters long"),
  breed: z.string().min(3, "Breed must be at least 3 characters long"),
  weight: z.number().min(1, "Weight must be at least 1 kg"),
  age: z
    .number()
    .min(1, "Age must be at least 1 year")
    .int("Age must be a whole number")
    .positive("Age must be a positive number"),
});

export type PetFormData = z.infer<typeof petSchema>;
