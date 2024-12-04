import { AppointmentsType, MedicationType } from "@/types";
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

export function writeUsers(
  userId: number,
  name: string | null,
  appointments: AppointmentsType[],
  medications: MedicationType[]
) {
  const db = getDatabase(app, process.env.NEXT_PUBLIC_DB);
  const reference = ref(db, "users/" + userId);

  set(reference, {
    username: name,
    appointments: appointments,
    medications: medications,
  });
}

export const auth = getAuth(app);

export default app;
