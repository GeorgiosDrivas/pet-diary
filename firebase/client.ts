import { AppointmentsType, Pet } from "@/types";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGRENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app, process.env.NEXT_PUBLIC_DB);

export function writeUsers(userId: number, name: string | null, pets: Pet[]) {
  const reference = ref(db, "users/" + userId);

  // Sanitize the appointments before writing them to Firebase
  const sanitizedPets = pets.map((pet) => ({
    ...pet,
    appointments: pet.appointments.map(sanitizeAppointment), // Sanitize each appointment
  }));

  // Write sanitized data to Firebase
  set(reference, {
    username: name,
    pets: sanitizedPets,
  });
}

// Function to sanitize appointment data by removing undefined properties
const sanitizeAppointment = (appointment: AppointmentsType) => {
  const sanitizedAppointment: AppointmentsType = {
    ...appointment,
    people: appointment.people ?? [], // Default to an empty array
    calendarId: appointment.calendarId ?? undefined, // Default to undefined
    location: appointment.location ?? "", // Default to an empty string
    _options: appointment._options ?? undefined, // Default to undefined or remove if not needed
  };

  // Remove any properties that are undefined or null before saving to Firebase
  return Object.fromEntries(
    Object.entries(sanitizedAppointment).filter(
      ([_, value]) => value !== undefined && value !== null
    )
  );
};

export const auth = getAuth(app);

export default app;
