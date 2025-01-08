"use client";

import React, { useState } from "react";
import { addAppointment } from "../../firebase/addMethods";
import { Data } from "@/types";
import CloseSvg from "@/assets/closeSvg";
import CreateButton from "@/utils/createButton";
import { stateChange } from "@/utils/stateChange";
import { handleNewItem } from "@/utils/newItem";
import AppointmentsTable from "./appointments/appointmentsTable";

export default function Appointments({ pet }: Data) {
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    id: 1,
    title: "",
    doctor: "",
    date: "",
    notes: "",
  });

  return (
    <>
      <div className="appointments h-full px-8 py-5">
        <h2>Appointments</h2>
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <form
                onSubmit={() => {
                  handleNewItem(pet, addAppointment, newAppointment);
                }}
              >
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={newAppointment.title}
                    onChange={(e) =>
                      stateChange(e, "title", setNewAppointment, newAppointment)
                    }
                  />
                </div>
                <div>
                  <label htmlFor="doctor">Doctor</label>
                  <input
                    type="text"
                    id="doctor"
                    value={newAppointment.doctor}
                    onChange={(e) =>
                      stateChange(
                        e,
                        "doctor",
                        setNewAppointment,
                        newAppointment
                      )
                    }
                  />
                </div>
                <div>
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={newAppointment.date}
                    onChange={(e) =>
                      stateChange(e, "date", setNewAppointment, newAppointment)
                    }
                  />
                </div>
                <div>
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    value={newAppointment.notes}
                    onChange={(e) =>
                      stateChange(e, "notes", setNewAppointment, newAppointment)
                    }
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
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
