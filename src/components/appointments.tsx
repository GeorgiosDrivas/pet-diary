"use client";

import React, { useState } from "react";
import { addAppointment } from "../../firebase/client";
import { AppointmentsType, Pet } from "@/types";

interface Data {
  pet: Pet | null;
}

export default function Appointments({ pet }: Data) {
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    doctor: "",
    date: "",
    notes: "",
  });

  const handleNewAppointment = () => {
    if (pet) {
      addAppointment(1, pet.name, newAppointment);
    } else {
      console.error("No pet selected for adding an appointment.");
    }
  };

  return (
    <div className="appointments h-full px-8 py-5">
      <h2>Appointments</h2>
      <div className="mt-8">
        {showForm ? (
          <div className="relative w-[300px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNewAppointment();
              }}
            >
              <div>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={newAppointment.title}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      title: e.target.value,
                    })
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
                    setNewAppointment({
                      ...newAppointment,
                      doctor: e.target.value,
                    })
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
                    setNewAppointment({
                      ...newAppointment,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  value={newAppointment.notes}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      notes: e.target.value,
                    })
                  }
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            <button
              className="hide-form-btn"
              onClick={() => setShowForm((prv) => !prv)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g id="Menu / Close_MD">
                  <path
                    id="Vector"
                    d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
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
                <button className="mt-4" onClick={() => setShowForm(true)}>
                  Create an Appointment
                </button>
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
