import { AppointmentsType, Pet } from "@/types";
import { db, writeUsers } from "./client";
import { get, ref } from "firebase/database";
import { noteSchemaType } from "@/schemas/notesSchemas";

export async function editAppointment(
  userId: string,
  petName: string | undefined,
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
        calendarId: updatedAppointment.id ?? null,
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

export async function editNote(
  userId: string,
  petId: string | undefined,
  noteId: string,
  updatedNote: noteSchemaType
) {
  const reference = ref(db, `users/${userId}`);
  try {
    const snapshot = await get(reference);
    if (!snapshot.exists()) {
      console.error("User not found!");
      return;
    }

    const userData: { username: string; pets: Pet[] } = snapshot.val();

    const updatedPets = userData.pets.map((pet) => {
      if (pet.id !== petId) return pet;

      return {
        ...pet,
        notes: pet.notes.map((note) => {
          if (note.id === noteId) {
            return { ...note, ...updatedNote };
          }
          return note;
        }),
      };
    });

    await writeUsers(userId, userData.username, updatedPets);
  } catch (error) {
    console.error("Error editing note:", error);
  }
}

export async function editPetDetails(
  userId: string,
  petId: string,
  updatedPet: Pet
) {
  const reference = ref(db, `users/${userId}`);
  try {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      const userData: { username: string; pets: Pet[] } = snapshot.val();

      const updatedPets = userData.pets.map((pet) => {
        if (pet.id === petId) {
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
