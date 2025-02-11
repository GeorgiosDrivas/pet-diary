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
            <p className="landing-text">
              Keep track of your pet&apos;s health with ease! <br />
              Pet Diary helps you manage vet visits, medications, and daily care
              all in one place.
            </p>
          </div>
          <div className="landing-page-img">
            <img src="./landing-page.png" alt="Landing page image" />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mt-20">
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
      <div className="bottom-txt absolute">
        <p>
          Developed by
          <a
            href="https://www.linkedin.com/in/drivasgeorgios/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Georgios Drivas
          </a>
        </p>
      </div>
    </>
  );
}
