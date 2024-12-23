"use client";

import { useEffect, useState } from "react";
import { auth, readData } from "../../../firebase/client";
import Appointments from "@/components/appointments";
import Medication from "@/components/medication";
import { Pet, UserData } from "@/types";
import Logout from "@/utils/logout";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | any>(null);
  const [user, setUser] = useState<any>(null);

  const [currentPet, setCurrentPet] = useState<Pet | null>(null);
  const searchParams = useSearchParams();
  const userId = searchParams.get("user.uid");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User is signed in:", user);
        setUser(user);
        try {
          const data = await readData(1);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No user signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const selectPet = (name: string) => {
    const pet = userData?.pets.find((pet: any) => pet.name === name);
    setCurrentPet(pet || null);
  };

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="w-full h-screen">
        <div className="grid grid-cols-12 gap-4 h-full">
          <div className="col-span-2">
            <div
              id="sidebar"
              className="bg-[#ffffff] h-full grid grid-rows-12 ps-5"
            >
              <div className="row-span-5">
                <h1>Pet Diary</h1>
              </div>
              <div className="row-span-6">
                <p className="mb-5">Your Pets</p>
                {userData &&
                  userData.pets.map((pet: any) => (
                    <p
                      key={pet.name}
                      className="cursor-pointer single-pet"
                      onClick={() => selectPet(pet.name)}
                    >
                      {pet.name}
                    </p>
                  ))}
                <svg
                  className="new-pet-svg cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18M12 6V18"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="flex justify-between items-center row-span-1">
                <p>{user?.displayName || "Guest"}</p>
                <Logout />
              </div>
            </div>
          </div>
          <div className="col-span-10 pe-4">
            <div className="grid grid-rows-12 gap-4 h-full py-3">
              <div className="row-span-6">
                <Appointments pet={currentPet} />
              </div>
              <div className="row-span-6">
                <Medication pet={currentPet} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
