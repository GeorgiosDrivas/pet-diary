import { v4 as uuidv4 } from "uuid";
import { get, ref } from "firebase/database";
import { db, writeUsers } from "./client";
import { AppointmentsType, Pet } from "@/types";
import { noteSchemaType } from "@/schemas/notesSchemas";

export async function addPet(userId: string, pet: Pet) {
  const reference = ref(db, `users/${userId}`);
  try {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      const userData: { username: string; pets: Pet[] } = snapshot.val();
      const updatedPets = [...(userData.pets || []), pet];

      await writeUsers(userId, userData.username, updatedPets);
    } else {
      console.error("User not found!");
    }
  } catch (error) {
    console.error("Error adding pet:", error);
  }
}

export async function addNote(
  userId: string,
  petName: string,
  newNote: noteSchemaType
) {
  const reference = ref(db, `users/${userId}`);
  try {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      const userData: { username: string; pets: Pet[] } = snapshot.val();

      const updatedPets = userData.pets.map((pet) => {
        if (pet.name === petName) {
          return {
            ...pet,
            notes: [
              ...(pet.notes || []),
              {
                ...newNote,
                id: uuidv4(),
              },
            ],
          };
        }
        return pet;
      });

      await writeUsers(userId, userData.username, updatedPets);
    } else {
      console.error("User not found!");
    }
  } catch (error) {
    console.error("Error adding Note:", error);
  }
}

export async function addAppointment(
  userId: string,
  petName: string,
  newAppointment: AppointmentsType
) {
  const reference = ref(db, `users/${userId}`);
  try {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      const userData: { username: string; pets: Pet[] } = snapshot.val();

      const petsArray = Array.isArray(userData.pets)
        ? userData.pets
        : Object.values(userData.pets || {});

      const updatedPets = petsArray.map((pet: any) => {
        if (pet.name === petName) {
          return {
            ...pet,
            appointments: [
              ...(Array.isArray(pet.appointments) ? pet.appointments : []),
              {
                ...newAppointment,
                id: uuidv4(),
              },
            ],
          };
        }
        return pet;
      });

      await writeUsers(userId, userData.username, updatedPets);
    } else {
      console.error("User not found!");
    }
  } catch (error) {
    console.error("Error adding appointment:", error);
  }
}
