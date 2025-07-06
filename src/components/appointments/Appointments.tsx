"use client";

import React from "react";
import CreateButton from "@/components/CreateButton";
import AppointmentsTable from "./AppointmentsTable";
import SelectPetMessage from "../pet/SelectPet";
import CloseSvg from "@/assets/closeSvg";
import { useEffect, useState } from "react";
import { Pet } from "@/types";
import AppointmentsForm from "./AppointmentsForm";

export default function Appointments({
  pet,
  userId,
}: {
  pet: Pet;
  userId: string;
}) {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState(pet.appointments);

  useEffect(() => {
    if (pet.appointments) {
      setAppointments([...pet.appointments]);
    }
  }, [pet.appointments]);

  return (
    <>
      <div className="appointments rounded-[40px] h-full">
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <AppointmentsForm userId={userId} pet={pet} />
              <button
                className="hide-form-btn remove-btn"
                onClick={() => setShowForm((prv: boolean) => !prv)}
              >
                <CloseSvg />
              </button>
            </div>
          ) : (
            <>
              {pet ? (
                <>
                  {pet.appointments ? (
                    <>
                      <AppointmentsTable
                        pet={pet}
                        userId={userId}
                        appointments={appointments}
                        setAppointments={setAppointments}
                      />
                      <CreateButton
                        showForm={setShowForm}
                        text="Create an appointment"
                      />
                    </>
                  ) : (
                    <CreateButton
                      showForm={setShowForm}
                      text="Create an appointment"
                    />
                  )}
                </>
              ) : (
                <SelectPetMessage
                  message="Please select a pet to view appointments."
                  cls="select-pet-msg text-center"
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
