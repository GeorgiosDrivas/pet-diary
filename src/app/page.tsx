"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, writeUsers } from "../../firebase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Credits from "@/components/Credits";

export default function Home() {
  const router = useRouter();

  const handleGoogle = async () => {
    if (auth.currentUser) {
      console.log("Already signed in:", auth.currentUser);
      router.push(`/dashboard?${auth.currentUser.uid}`);
      return;
    }

    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    writeUsers(user.uid, user.displayName, []);

    router.push(`/dashboard?${user.uid}`);
    console.log("User signed in:", user);
  };

  return (
    <>
      <header>
        <div className="logo">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </div>
      </header>
      <main>
        <div className="flex flex-row justify-around items-center">
          <div>
            <h1 className="text-center">Pet Diary</h1>
            <p className="landing-text text-center text-lg">
              Keep track of your pet&apos;s health with ease! <br />
              Pet Diary helps you manage vet visits, medications, and daily care
              all in one place.
            </p>
          </div>
          <div className="landing-page-img h-auto flex jutsify-end items-end overflow-hidden">
            <img src="./landing-page.png" alt="Landing page image" />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mt-20">
          <button
            onClick={handleGoogle}
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
      <Credits />
    </>
  );
}
