import { v4 as uuidv4 } from "uuid";
import { get, ref } from "firebase/database";
import { db, writeUsers } from "./client";
import { AppointmentsType, MedicationType, Pet } from "@/types";

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

export async function addMedication(
  userId: string,
  petName: string,
  newMedication: MedicationType
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
            medications: [
              ...(pet.medications || []),
              {
                ...newMedication,
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
    console.error("Error adding medication:", error);
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

      // Ensure pets is always an array
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
