"use client";

import React from "react";
import CreateButton from "@/utils/createButton";
import AppointmentsTable from "./appointmentsTable";
import SelectPetMessage from "../selectPet";
import CloseSvg from "@/assets/closeSvg";
import AppointmentsForm from "./appointmentsForm";
import { useEffect, useState } from "react";
import { AppointmentsType, Pet } from "@/types";

export default function Appointments({
  pet,
  userId,
}: {
  pet: Pet;
  userId: string;
}) {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState(pet.appointments);
  const [newAppointment, setNewAppointment] = useState<AppointmentsType>({
    id: "1",
    title: "",
    doctor: "",
    start: "",
    end: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    setAppointments([...pet.appointments]);
  }, [pet.appointments]);

  return (
    <>
      <div className="appointments rounded-[40px] h-full px-8 py-5">
        <h3>Appointments</h3>
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <AppointmentsForm
                userId={userId}
                newAppointment={newAppointment}
                setNewAppointment={setNewAppointment}
                pet={pet}
              />
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
                <SelectPetMessage message="Please select a pet to view appointments." />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
