"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/client";

export default function Home() {
  const handleGoogle = async (e: any) => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
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
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="mr-2"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.994 3.063H4.878v-1.474h3.116v-1.474H4.878V6.469h3.116v-1.474H4.878v-1.474h3.116v-1.474H4.878V2.002h3.116C10.291 2.002 12 3.792 12 6s-1.709 3.998-4 3.998z" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </main>
    </div>
  );
}
