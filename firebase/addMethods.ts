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
  petId: string,
  newNote: noteSchemaType
) {
  const reference = ref(db, `users/${userId}`);
  try {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      const userData: { username: string; pets: Pet[] } = snapshot.val();

      const updatedPets = userData.pets.map((pet) => {
        if (pet.id === petId) {
          return {
            ...pet,
            notes: [
              ...(pet.notes || []),
              {
                ...newNote,
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
  petId: string,
  newAppointment: AppointmentsType
) {
  const reference = ref(db, `users/${userId}`);
  try {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      const userData: { username: string; pets: Pet[] } = snapshot.val();

      const updatedPets = userData.pets.map((pet) => {
        if (pet.id === petId) {
          return {
            ...pet,
            appointments: [
              ...(pet.appointments || []),
              {
                ...newAppointment,
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
