"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGoogle = async (e: any) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Optionally handle user data
      const user = result.user;
      console.log("Signed-in user:", user);

      // Redirect to the dashboard
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
            onClick={(e) => handleGoogle(e)}
            className="flex flex-row justify-center items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow"
          >
            <Image
              src="/google-logo.png"
              width={20}
              height={20}
              className="me-3"
              alt="Picture of the author"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
}
