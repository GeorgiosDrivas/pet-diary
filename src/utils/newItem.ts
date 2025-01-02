import { AppointmentsType, MedicationType, Pet } from "@/types";

export const handleNewItem = <T extends MedicationType | AppointmentsType>(
  pet: Pet | null,
  setter: (
    userId: number,
    petName: string,
    newAppointment: AppointmentsType | MedicationType
  ) => Promise<void>,
  newItem: T
) => {
  if (pet) {
    setter(1, pet.name, newItem);
  } else {
    console.error("No pet selected for adding a medication.");
  }
};
