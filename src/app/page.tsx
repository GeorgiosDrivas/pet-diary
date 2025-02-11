"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, writeUsers } from "../../firebase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await writeUsers(user.uid, user.displayName, []);
      router.push(`/dashboard?${user.uid}`);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          <img src="./logo.png" alt="Logo" />
        </div>
      </header>
      <main>
        <div className="flex flex-row justify-around items-center">
          <div>
            <p>
              Manage your pet&apos;s medication and doctor appointments easily!
            </p>
          </div>
          <div className="landing-page-img">
            <img src="./landing-page.png" alt="Landing page image" />
          </div>
        </div>
        <div>
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
    </>
  );
}
