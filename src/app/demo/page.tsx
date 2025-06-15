"use client";

import React, { useEffect, useState } from "react";
import { Pet, User, UserData } from "@/types";
import Logout from "@/components/Logout";
import SelectPetMessage from "@/components/pet/SelectPet";
import CreateButton from "@/components/CreateButton";
import Tabs from "@/components/Tabs";
import { useMediaQuery } from "react-responsive";
import PetDetails from "@/components/pet/PetDetails";
import Appointments from "@/components/appointments/Appointments";
import Medication from "@/components/medications/Medication";
import { auth } from "../../../firebase/client";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useRouter } from "next/navigation";
import DemoNewPet from "@/components/demo/NewPet";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [newPetBool, setNewPetBool] = useState<boolean>(false);
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        try {
          const { user: anonUser } = await signInAnonymously(auth);
          setUser(anonUser);
        } catch (err) {
          console.error("Anonymous sign-in failed", err);
        }
      } else if (!firebaseUser.isAnonymous) {
        router.push("/");
      } else {
        setUser(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const selectPet = (name: string) => {
    setNewPetBool(false);
    const pet = pets?.find((pet: Pet) => pet?.name === name);
    setCurrentPet(pet || null);
  };

  return (
    <main className="flex flex-col gap-8 items-center sm:items-start px-5 mt-4">
      <div className="nav-bar flex justify-between items-start w-full">
        <div
          id="sidebar"
          className="sidebar-container flex justify-start items-start flex-col"
        >
          <h2>Your pets</h2>
          {pets &&
            pets.map((pet: Pet) => (
              <div
                className="flex justify-between items-center mb-3 pe-2 single-pet-wrap"
                key={pet.name}
              >
                <button
                  className="single-pet-btn overflow-hidden flex items-center gap-2 hover:w-auto"
                  onClick={() => selectPet(pet.name)}
                >
                  <img
                    src={`/${pet.species.toLowerCase()}.svg`}
                    alt="Pet logo"
                    className="species-img me-3"
                  />
                  <p className="cursor-pointer single-pet m-0 p-0">
                    {pet.name}
                  </p>
                </button>
              </div>
            ))}
          <div className="create-new-pet-btn">
            <CreateButton showForm={setNewPetBool} text="Add new pet" />
          </div>
        </div>
        <div className="flex justify-end me-3">
          <Logout />
        </div>
      </div>
      <div className="w-full h-screen">
        <div className="dashboard-container h-full">
          {newPetBool && user ? (
            <DemoNewPet setPets={setPets} />
          ) : (
            <div
              className={
                !currentPet
                  ? "h-full w-full flex justify-center items-center"
                  : ""
              }
            >
              {currentPet ? (
                isDesktop ? (
                  <Tabs pet={currentPet} userId={user?.uid || ""} />
                ) : (
                  <>
                    <div className="flex flex-col gap-5">
                      <PetDetails pet={currentPet} userId={user?.uid || ""} />
                      <Appointments pet={currentPet} userId={user?.uid || ""} />
                      <Medication pet={currentPet} userId={user?.uid || ""} />
                    </div>
                  </>
                )
              ) : (
                <SelectPetMessage
                  message={`Select a pet to view its appointments, medication and details. Or add a new pet to get started.`}
                  cls="select-pet-msg text-center"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
