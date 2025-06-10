"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, writeUsers } from "../../firebase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Credits from "@/components/Credits";

export default function Home() {
  const router = useRouter();
  const [loginLoading, setLoginLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      setLoginLoading(true);
      if (auth.currentUser) {
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </div>
      </header>
      <main>
        <div className="main-container flex justify-around items-center">
          <div>
            <h1 className="text-center">Pet Diary</h1>
            <p className="landing-text text-center text-lg">
              Keep track of your pet&apos;s health with ease! <br />
              Pet Diary helps you manage vet visit and medications all in one
              place.
            </p>
          </div>
          <div className="landing-page-img h-auto flex jutsify-end items-end overflow-hidden">
            <Image
              src="/landing-page.png"
              alt="Landing page image"
              width={700}
              height={100}
              priority
            />
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
              alt="Google logo"
            />
            <span>Connect with Google</span>
          </button>
        </div>
        <Credits />
        {loginLoading && (
          <div className="absolute w-screen h-screen bg-white top-0 left-0 flex justify-center items-center  z-50">
            <div className="w-12 h-12 border-4 border-[#FF9300] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </main>
    </>
  );
}
