import { AppointmentsType, MedicationType, Pet } from "@/types";
import { db, writeUsers } from "./client";
import { get, ref } from "firebase/database";

export async function editAppointment(
  userId: string,
  petName: string,
  appointmentId: string,
  updatedAppointment: AppointmentsType
) {
  const reference = ref(db, `users/${userId}`);
  try {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      const userData: { username: string; pets: Pet[] } = snapshot.val();

      const sanitizedAppointment: AppointmentsType = {
        ...updatedAppointment,
        people: updatedAppointment.people ?? [],
        calendarId: updatedAppointment.calendarId ?? null,
        location: updatedAppointment.location ?? "",
      };

      const updatedPets = userData.pets.map((pet) => {
        if (pet.name === petName) {
          return {
            ...pet,
            appointments: pet.appointments.map((appointment) => {
              if (appointment.id === appointmentId) {
                return sanitizedAppointment;
              }
              return appointment;
            }),
          };
        }
        return pet;
      });

      await writeUsers(userId, userData.username, updatedPets);
    } else {
      console.error("User not found!");
    }
  } catch (error) {
    console.error("Error editing appointment:", error);
  }
}

export async function editMedication(
  userId: string,
  petName: string,
  medicationId: string,
  updatedMedication: MedicationType
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
            medications: pet.medications.map((medication) => {
              if (medication.id === medicationId) {
                return updatedMedication;
              }
              return medication;
            }),
          };
        }
        return pet;
      });

      await writeUsers(userId, userData.username, updatedPets);
    } else {
      console.error("User not found!");
    }
  } catch (error) {
    console.error("Error editing appointment:", error);
  }
}

export async function editPetDetails(
  userId: string,
  petName: string,
  updatedPet: Pet
) {
  const reference = ref(db, `users/${userId}`);
  try {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      const userData: { username: string; pets: Pet[] } = snapshot.val();

      const updatedPets = userData.pets.map((pet) => {
        if (pet.name === petName) {
          return updatedPet;
        }
        return pet;
      });

      await writeUsers(userId, userData.username, updatedPets);
    } else {
      console.error("User not found!");
    }
  } catch (error) {
    console.error("Error editing pet details:", error);
  }
}
