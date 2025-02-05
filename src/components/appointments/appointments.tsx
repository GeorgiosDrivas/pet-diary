"use client";

import React, { useState } from "react";
import { AppointmentsType, Pet } from "@/types";
import CloseSvg from "@/assets/closeSvg";
import CreateButton from "@/utils/createButton";
import AppointmentsTable from "./appointmentsTable";
import AppointmentsForm from "./appointmentsForm";
import SelectPetMessage from "../selectPet";

export default function Appointments({
  pet,
  userId,
}: {
  pet: Pet;
  userId: string;
}) {
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState<AppointmentsType>({
    id: "1",
    title: "",
    doctor: "",
    start: "",
    end: "",
    description: "",
  });

  return (
    <>
      <div className="appointments rounded-[40px] h-full px-8 py-5">
        <h2>Appointments</h2>
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
                onClick={() => setShowForm((prv) => !prv)}
              >
                <CloseSvg />
              </button>
            </div>
          ) : (
            <>
              {pet ? (
                <>
                  <AppointmentsTable pet={pet} userId={userId} />
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
