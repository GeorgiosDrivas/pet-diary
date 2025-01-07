import { onValue, ref } from "firebase/database";
import { db } from "./client";

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
