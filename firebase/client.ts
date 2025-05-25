import { AppointmentsType, Pet } from "@/types";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, set, update } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app, process.env.NEXT_PUBLIC_DB);

export async function writeUsers(
  userId: string,
  name: string | null,
  pets: Pet[]
) {
  const reference = ref(db, "users/" + userId);

  try {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      const existingData = snapshot.val();
      const existingPets = Array.isArray(existingData.pets)
        ? existingData.pets
        : Object.values(existingData.pets || {});

      const updatedPets = existingPets.map((existingPet: Pet) => {
        const updatedPet = pets.find((p) => p.name === existingPet.name);
        return updatedPet ? sanitizePet(updatedPet) : existingPet;
      });

      await update(reference, { pets: updatedPets });

      return;
    }

    await set(reference, {
      username: name,
      pets: pets.map(sanitizePet),
    });
  } catch (error) {
    console.error("Error checking/creating/updating user profile:", error);
  }
}

const sanitizePet = (pet: Pet) => ({
  ...pet,
  appointments: pet.appointments?.map(sanitizeAppointment) || [],
});

const sanitizeAppointment = (appointment: AppointmentsType) => {
  const sanitizedAppointment: AppointmentsType = {
    ...appointment,
    people: appointment.people ?? [],
    calendarId: appointment.calendarId ?? undefined,
    location: appointment.location ?? "",
    _options: appointment._options ?? undefined,
  };

  return Object.fromEntries(
    Object.entries(sanitizedAppointment).filter(
      ([_, value]) => value !== undefined && value !== null
    )
  );
};

export const auth = getAuth(app);

export default app;
