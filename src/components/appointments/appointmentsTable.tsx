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

  const removeAppointmentFn = (pet: Pet, appointmentId: string) => {
    window.location.reload();
    removeAppointment(1, pet?.name, appointmentId);
    alert("Appointment removed successfully.");
  };

  const editAppointment = (appointment: AppointmentsType) => {
    setEditItem(true);
    setEditableAppointment(appointment);
  };

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
              <th>Notes</th>
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
                    <td className="text-center py-3">
                      {appointment.notes || "No notes"}
                    </td>
                    <td className="text-center py-3">
                      <button
                        className="me-3 my-2"
                        onClick={() => editAppointment(appointment)}
                      >
                        <EditSvg />
                      </button>
                      <button
                        className="remove-btn my-2"
                        onClick={() => removeAppointmentFn(pet, appointment.id)}
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
