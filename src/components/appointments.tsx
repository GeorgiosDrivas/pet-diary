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
    id: 1,
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
                            <button className="me-3 mt-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                                  fill="#0F0F0F"
                                />
                              </svg>
                            </button>
                            <button className="mt-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M10 12V17"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14 12V17"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M4 7H20"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
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
