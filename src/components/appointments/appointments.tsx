"use client";

import React, { useState } from "react";
import { AppointmentsType, Data } from "@/types";
import CloseSvg from "@/assets/closeSvg";
import CreateButton from "@/utils/createButton";
import AppointmentsTable from "./appointmentsTable";
import AppointmentsForm from "./appointmentsForm";

export default function Appointments({ pet }: Data) {
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
      <div className="appointments h-full px-8 py-5">
        <h2>Appointments</h2>
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <AppointmentsForm
                newAppointment={newAppointment}
                setNewAppointment={setNewAppointment}
                pet={pet}
              />
              <button
                className="hide-form-btn"
                onClick={() => setShowForm((prv) => !prv)}
              >
                <CloseSvg />
              </button>
            </div>
          ) : (
            <>
              {pet ? (
                <>
                  <AppointmentsTable pet={pet} />
                  <CreateButton
                    showForm={setShowForm}
                    text="Create an appointment"
                  />
                </>
              ) : (
                <p>Please select a pet to view appointments.</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
