"use client";

import React, { useState } from "react";
import { addAppointment } from "../../firebase/addMethods";
import { removeAppointment } from "../../firebase/deleteMethods";
import { AppointmentsType, Data, Pet } from "@/types";
import DeleteSvg from "@/assets/deleteSvg";
import EditSvg from "@/assets/editSvg";
import CloseSvg from "@/assets/closeSvg";
import CreateButton from "@/utils/createButton";
import { stateChange } from "@/utils/stateChange";
import { handleNewItem } from "@/utils/newItem";

export default function Appointments({ pet }: Data) {
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    id: 1,
    title: "",
    doctor: "",
    date: "",
    notes: "",
  });

  const removeAppointmentFn = (pet: Pet, index: number) => {
    window.location.reload();
    removeAppointment(1, pet?.name, index);
    alert("Appointment removed successfully.");
  };

  return (
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
                    stateChange(e, "doctor", setNewAppointment, newAppointment)
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
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pet.appointments.length > 0 ? (
                      pet.appointments.map(
                        (appointment: AppointmentsType, index: number) => (
                          <tr key={index} className="border-b border-[#e5e7eb]">
                            <td className="text-center py-3">
                              {appointment.title}
                            </td>
                            <td className="text-center py-3">
                              {appointment.doctor}
                            </td>
                            <td className="text-center py-3">
                              {appointment.date}
                            </td>
                            <td className="text-center py-3">
                              {appointment.notes || "No notes"}
                            </td>
                            <td className="text-center py-3">
                              <button className="me-3 my-2">
                                <EditSvg />
                              </button>
                              <button
                                className="my-2"
                                onClick={() => removeAppointmentFn(pet, index)}
                              >
                                <DeleteSvg />
                              </button>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No appointments available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
  );
}
