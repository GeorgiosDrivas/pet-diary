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
export const db = getDatabase(app, process.env.NEXT_PUBLIC_DATABASE_URL);

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

      const petsById: Record<string, Pet> = {};
      for (const pet of existingPets) {
        petsById[pet.id] = pet;
      }

      for (const incomingPet of pets) {
        petsById[incomingPet.id] = sanitizePet(incomingPet);
      }

      const updatedPets = Object.values(petsById);
      await update(reference, { pets: updatedPets });
      return;
    }

    // First-time user setup
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

const sanitizeAppointment = (
  appointment: AppointmentsType
): AppointmentsType => {
  const sanitizedAppointment: AppointmentsType = appointment;

  return Object.fromEntries(
    Object.entries(sanitizedAppointment).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null
    )
  ) as AppointmentsType;
};

export const auth = getAuth(app);

export default app;
