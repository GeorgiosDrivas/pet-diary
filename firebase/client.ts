import { AppointmentsType, MedicationType } from "@/types";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGRENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app, process.env.NEXT_PUBLIC_DB);

export function writeUsers(
  userId: number,
  name: string | null,
  appointments: AppointmentsType[],
  medications: MedicationType[]
) {
  const reference = ref(db, "users/" + userId);

  set(reference, {
    username: name,
    appointments: appointments,
    medications: medications,
  });
}

export function readData(userId: number) {
  const userRef = ref(db, "users/" + userId);
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    console.log(`User data: ${JSON.stringify(data, null, 2)}`);
  });
}

export const auth = getAuth(app);

export default app;
