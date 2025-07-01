import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(3, "Name is required"),
  species: z.string().min(3, "Species is required"),
  breed: z.string().min(3, "Breed is required"),
  age: z.string().min(1, "Age is required"),
});

export type PetFormData = z.infer<typeof petSchema>;
