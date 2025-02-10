"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase/client";
import { readData } from "../../../firebase/readMethods";
import Appointments from "@/components/appointments/appointments";
import Medication from "@/components/medications/medication";
import { Pet, User, UserData } from "@/types";
import NewPet from "@/components/newPet";
import PetDetails from "@/components/petDetails";
import Logout from "@/utils/logout";
import ProfileSvg from "@/assets/profileSvg";
import SelectPetMessage from "@/components/selectPet";
import CreateButton from "@/utils/createButton";

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [newPetBool, setNewPetBool] = useState<boolean>(false);
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);
  const [profileModal, setProfileModal] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || undefined,
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
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="w-full h-screen">
        <div className="grid grid-cols-12 gap-4 h-full">
          <div className="col-span-2">
            <div className="logo">
              <img src="./logo.png" alt="Logo" />
            </div>
            <div
              id="sidebar"
              className="bg-transparent h-screen grid grid-rows-12 ps-5"
            >
              <div className="row-span-12 mt-5 flex justify-start items-start flex-col">
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
                <div>
                  <CreateButton showForm={setNewPetBool} text="Add new pet" />
                </div>
                {currentPet && (
                  <>
                    <hr className="w-full my-4" />
                    <div>
                      <PetDetails pet={currentPet} userId={user?.uid || ""} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-10">
            {newPetBool && user ? (
              <NewPet userId={user?.uid} />
            ) : (
              <div className="grid grid-cols-12">
                <div className="col-span-10">
                  {currentPet ? (
                    <>
                      <div className="content grid grid-rows-6 gap-4 py-3">
                        <div className="row-span-3">
                          <Appointments
                            pet={currentPet}
                            userId={user?.uid || ""}
                          />
                        </div>
                        <div className="row-span-3">
                          <Medication
                            pet={currentPet}
                            userId={user?.uid || ""}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <SelectPetMessage
                      message="Select a pet to view it's appointments, medication
                      and details"
                      cls="select-pet-msg text-center"
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <div className="flex justify-center items-center">
                    <button
                      className="profile-icon"
                      onClick={() => setProfileModal((prv) => !prv)}
                    >
                      <ProfileSvg />
                    </button>
                    <Logout />
                  </div>
                  {profileModal && (
                    <div className="user-info">
                      <img
                        src={user?.photoURL}
                        alt="User logo"
                        className="user-img me-3"
                      />
                      <div className="user-details">
                        <p className="m-0">
                          {user?.displayName || "User Name"}
                        </p>
                        <p className="m-0">
                          Total pets: {userData?.pets.length}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
