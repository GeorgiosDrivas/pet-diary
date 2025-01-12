import { Pet } from "@/types";
import { db, writeUsers } from "./client";
import { get, ref } from "firebase/database";

export async function removeAppointment(
  userId: number,
  petName: string,
  appointmentId: string
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
            appointments: pet.appointments?.filter(
              (appointment) => appointment.id !== appointmentId
            ),
          };
        }
        return pet;
      });

      await writeUsers(userId, userData.username, updatedPets);
    } else {
      console.error("User not found!");
    }
  } catch (error) {
    console.error("Error removing appointment:", error);
  }
}

export async function removeMedication(
  userId: number,
  petName: string,
  medicationId: string
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
            medications: pet.medications?.filter(
              (medication) => medication.id !== medicationId
            ),
          };
        }
        return pet;
      });

      await writeUsers(userId, userData.username, updatedPets);
    } else {
      console.error("User not found!");
    }
  } catch (error) {
    console.error("Error removing medication:", error);
  }
}

export async function removePet(userId: number, petName: string) {
  const reference = ref(db, `users/${userId}`);

  try {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      const userData: { username: string; pets: Pet[] } = snapshot.val();

      const updatedPets = userData.pets.filter((pet) => pet.name !== petName);

      await writeUsers(userId, userData.username, updatedPets);
    } else {
      console.error("User not found!");
    }
  } catch (error) {
    console.error("Error removing pet:", error);
  }
}
