"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase/client";
import { readData } from "../../../firebase/readMethods";
import Appointments from "@/components/appointments/appointments";
import Medication from "@/components/medications/medication";
import { Pet, User, UserData } from "@/types";
import Logout from "@/utils/logout";
import NewPet from "@/components/newPet";
import PetDetails from "@/components/petDetails";
import DeleteSvg from "@/assets/deleteSvg";
import { removePet } from "../../../firebase/deleteMethods";
import NewSvg from "@/assets/newSvg";

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [newPetBool, setNewPetBool] = useState<boolean>(false);
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
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

  const newPet = () => {
    setNewPetBool((prv) => !prv);
  };

  const selectPet = (name: string) => {
    setNewPetBool(false);
    const pet = userData?.pets.find((pet: Pet) => pet?.name === name);
    setCurrentPet(pet || null);
  };

  const removePetFn = (userId: number, petName: string) => {
    window.location.reload();
    removePet(userId, petName);
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
              <div className="row-span-11 mt-5">
                <p className="mb-5">Your Pets</p>
                {userData &&
                  userData.pets &&
                  userData.pets.map((pet: Pet) => (
                    <div
                      className="flex justify-between items-center mb-3 pe-2 single-pet-wrap"
                      key={pet.name}
                    >
                      <p
                        className="cursor-pointer single-pet m-0 p-0"
                        onClick={() => selectPet(pet.name)}
                      >
                        {pet.name}
                      </p>
                      <button
                        onClick={() => removePetFn(1, pet.name)}
                        className="remove-btn"
                      >
                        <DeleteSvg />
                      </button>
                    </div>
                  ))}
                <div className="flex justify-center">
                  <NewSvg onClick={newPet} />
                </div>
              </div>
              <div className="flex justify-between items-center row-span-1">
                <p>{user?.displayName || "Guest"}</p>
                <Logout />
              </div>
            </div>
          </div>
          <div className="col-span-10">
            {newPetBool ? (
              <NewPet />
            ) : (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-9">
                  <div className="grid grid-rows-12 gap-4 h-full py-3">
                    <div className="row-span-6">
                      <Appointments pet={currentPet} />
                    </div>
                    <div className="row-span-6">
                      <Medication pet={currentPet} />
                    </div>
                  </div>
                </div>
                <div className="col-span-3 flex p-0">
                  <PetDetails pet={currentPet} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
