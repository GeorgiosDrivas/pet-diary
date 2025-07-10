"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase/client";
import { readData } from "../../../firebase/readMethods";
import { Pet } from "@/types";
import NewPet from "@/components/pet/NewPet";
import Logout from "@/components/Logout";
import SelectPetMessage from "@/components/pet/SelectPet";
import CreateButton from "@/components/CreateButton";
import Tabs from "@/components/Tabs";
import { useMediaQuery } from "react-responsive";
import PetDetails from "@/components/pet/PetDetails";
import Appointments from "@/components/appointments/Appointments";
import Note from "@/components/notes/Note";
import { useAppContext } from "@/context/appContext";

export default function Dashboard() {
  const [newPetBool, setNewPetBool] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const { setUser, setUserData, user, userData, currentPet, setCurrentPet } =
    useAppContext();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
        });
        try {
          const data = await readData(user.uid);
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
    setNewPetBool(false);
    const pet = userData?.pets.find((pet: Pet) => pet?.name === name);
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
          {userData &&
            userData.pets &&
            userData.pets.map((pet: Pet) => (
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
            <NewPet userId={user?.uid} />
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
                  <Tabs userId={user?.uid || ""} />
                ) : (
                  <>
                    <div className="flex flex-col gap-5">
                      <PetDetails userId={user?.uid || ""} />
                      <Appointments userId={user?.uid || ""} />
                      <Note userId={user?.uid || ""} />
                    </div>
                  </>
                )
              ) : (
                <SelectPetMessage
                  message={`Select a pet to view its appointments, Note and details. Or add a new pet to get started.`}
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
