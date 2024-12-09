import { AppointmentsType, Pet } from "@/types";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get, getDatabase, onValue, ref, set } from "firebase/database";

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

export function writeUsers(userId: number, name: string | null, pets: Pet[]) {
  const reference = ref(db, "users/" + userId);

  set(reference, {
    username: name,
    pets: pets,
  });
}

export async function addAppointment(
  userId: number,
  petName: string,
  newAppointment: AppointmentsType
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
            appointments: [...(pet.appointments || []), newAppointment],
          };
        }
        return pet;
      });

      await writeUsers(userId, userData.username, updatedPets);
      console.log("Appointment added successfully!");
    } else {
      console.error("User not found!");
    }
  } catch (error) {
    console.error("Error adding appointment:", error);
  }
}

export function readData(userId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    const userRef = ref(db, "users/" + userId);
    onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export const auth = getAuth(app);

export default app;
