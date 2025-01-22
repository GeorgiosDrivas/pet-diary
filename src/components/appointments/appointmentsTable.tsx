import DeleteSvg from "@/assets/deleteSvg";
import EditSvg from "@/assets/editSvg";
import { AppointmentsType, Pet } from "@/types";
import { removeAppointment } from "../../../firebase/deleteMethods";
import React, { useState } from "react";
import EditAppointment from "./editAppointment";

export default function AppointmentsTable({ pet }: { pet: Pet }) {
  const [editItem, setEditItem] = useState(false);
  const [editableAppointment, setEditableAppointment] =
    useState<AppointmentsType | null>(null);

  const removeAppointmentFn = (appointmentId: string) => {
    removeAppointment(1, pet?.name, appointmentId)
      .then(() => {
        // Filter out the removed appointment
        pet.appointments = pet.appointments.filter(
          (appointment) => appointment.id !== appointmentId
        );
        alert("Appointment removed successfully.");
      })
      .catch((err) => {
        console.error("Error removing appointment:", err);
      });
  };

  const editAppointment = (appointment: AppointmentsType) => {
    setEditItem(true);
    setEditableAppointment(appointment);
  };

  const hasNotes = pet.appointments.some(
    (appointment) => appointment.notes && appointment.notes.trim() !== ""
  );

  return (
    <>
      {editItem ? (
        <EditAppointment
          pet={pet}
          appointment={editableAppointment}
          setAppointment={setEditableAppointment}
          setEditable={setEditItem}
        />
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th>Title</th>
              <th>Doctor</th>
              <th>Date</th>
              {hasNotes && <th>Notes</th>}
            </tr>
          </thead>
          <tbody>
            {pet.appointments.length > 0 ? (
              pet.appointments.map(
                (appointment: AppointmentsType, index: number) => (
                  <tr key={index} className="border-b border-[#e5e7eb]">
                    <td className="text-center py-3">{appointment.title}</td>
                    <td className="text-center py-3">{appointment.doctor}</td>
                    <td className="text-center py-3">{appointment.date}</td>
                    {appointment.notes && (
                      <td className="text-center py-3">{appointment.notes}</td>
                    )}
                    <td className="text-center py-3">
                      <button
                        className="me-3 my-2 edit-btn"
                        onClick={() => editAppointment(appointment)}
                      >
                        <EditSvg />
                      </button>
                      <button
                        className="remove-btn my-2"
                        onClick={() => removeAppointmentFn(appointment.id)}
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
      )}
    </>
  );
}
