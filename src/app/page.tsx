"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, writeUsers } from "../../firebase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";

export default function Home() {
  const router = useRouter();
  const { setUser } = useAuthContext();

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      setUser(user);
      writeUsers(1, user.displayName, [
        {
          name: "Aron",
          appointments: [
            { title: "Vet", doctor: "Mike James", date: "20/01/2002" },
          ],
          medications: [{ medicationName: "Vet", date: "20/01/2002" }],
        },
        {
          name: "Alvin",
          appointments: [
            { title: "Checkup", doctor: "Sarah Taylor", date: "25/01/2002" },
          ],
          medications: [{ medicationName: "Checkup Med", date: "25/01/2002" }],
        },
      ]);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1 className="text-center text-3xl mb-5">Pet Diary</h1>
          <p>Manage your pet's medication and doctor apointments easily!</p>
        </div>
        <div className="flex justify-center items-center w-full">
          <button
            onClick={() => handleGoogle()}
            className="flex flex-row justify-center items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow"
          >
            <Image
              src="/google-logo.png"
              width={20}
              height={20}
              className="me-3"
              alt="Picture of the author"
            />
            <span>Connect with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
}
