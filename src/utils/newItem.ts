import { noteSchemaType } from "@/schemas/notesSchemas";
import { AppointmentsType, Pet } from "@/types";

export const handleNewItem = <T extends noteSchemaType | AppointmentsType>(
  userId: string,
  pet: Pet | null,
  setter: (userId: string, petId: string, newItem: T) => Promise<void>,
  newItem: T
) => {
  if (pet) {
    setter(userId, pet.id, newItem);
  } else {
    alert("No pet selected for adding a Note.");
  }
};
