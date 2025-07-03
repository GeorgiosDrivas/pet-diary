import { PetFormData } from "@/schemas/petSchema";

export default function newPet(newPetObj: PetFormData) {
  return {
    name: newPetObj.name,
    species: newPetObj.species,
    breed: newPetObj.breed,
    age: newPetObj.age,
    appointments: [
      {
        id: "1",
        title: "Example",
        doctor: "Dr. Example",
        start: "2024-10-10",
        end: "2024-10-10",
        time: "",
        description: "This is an example appointment",
      },
    ],
    notes: [
      {
        id: "",
        title: "Example",
        content: "Dr. Example",
      },
    ],
  };
}
