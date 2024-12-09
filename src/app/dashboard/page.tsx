"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/utils/auth";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import { readData } from "../../../firebase/client";
import Appointments from "@/components/appointments";
import Medication from "@/components/medication";
import { Pet, UserData } from "@/types";
import Logout from "@/utils/logout";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const { user } = useAuthContext();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    doctor: "",
    date: "",
    notes: "",
  });
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);

  useEffect(() => {
    if ((!loading && !isAuthenticated) || !user) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await readData(1);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  if (loading || !userData) {
    return <div>Loading...</div>;
  }

  const selectPet = (name: string) => {
    const pet = userData?.pets.find((pet) => pet.name === name);
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
              </div>
              <div className="flex justify-between items-center row-span-1">
                <p>{user.displayName}</p>
                <svg
                  onClick={() => Logout()}
                  className="me-4 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="col-span-10 pe-4">
            <div className="grid grid-rows-12 gap-4 h-full py-3">
              <div className="row-span-6">
                <Appointments
                  showForm={showForm}
                  setShowForm={setShowForm}
                  newAppointment={newAppointment}
                  setNewAppointment={setNewAppointment}
                  pet={currentPet}
                />
              </div>
              <div className="row-span-6">
                <Medication pet={currentPet} showForm={showForm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
