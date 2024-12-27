import { AppointmentsType, MedicationType, Pet } from "@/types";

interface NewItemProps {
  pet: Pet | null;
  itemType: (
    id: number,
    name: string,
    item: AppointmentsType | MedicationType
  ) => void;
  newItem: AppointmentsType | MedicationType;
}

export const handleNewMedication = ({
  pet,
  itemType,
  newItem,
}: NewItemProps) => {
  if (pet) {
    itemType(1, pet.name, newItem);
  } else {
    console.error("No pet selected.");
  }
};
