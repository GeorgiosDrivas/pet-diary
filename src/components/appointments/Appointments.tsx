"use client";

import React from "react";
import CreateButton from "@/components/CreateButton";
import AppointmentsTable from "./AppointmentsTable";
import SelectPetMessage from "../pet/SelectPet";
import CloseSvg from "@/assets/closeSvg";
import { useEffect, useState } from "react";
import AppointmentsForm from "./AppointmentsForm";
import { useAppContext } from "@/context/appContext";
import { AppointmentsType } from "@/types";

export default function Appointments({ userId }: { userId: string }) {
  const { currentPet } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentsType[]>(
    currentPet?.appointments ?? []
  );

  useEffect(() => {
    if (currentPet && currentPet.appointments) {
      setAppointments([...currentPet.appointments]);
    } else {
      setAppointments([]);
    }
  }, [currentPet?.appointments]);

  return (
    <>
      <div className="appointments rounded-[40px] h-full">
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <AppointmentsForm userId={userId} pet={currentPet} />
              <button
                className="hide-form-btn remove-btn"
                onClick={() => setShowForm((prv: boolean) => !prv)}
              >
                <CloseSvg />
              </button>
            </div>
          ) : (
            <>
              {currentPet ? (
                <>
                  {currentPet.appointments ? (
                    <>
                      <AppointmentsTable
                        userId={userId}
                        appointments={appointments ?? []}
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
