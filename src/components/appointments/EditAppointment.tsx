import CloseSvg from "@/assets/closeSvg";
import { AppointmentsType, Pet } from "@/types";
import React from "react";
import { convertDateToInputFormat } from "@/components/FormatDate";
import { editAppointment } from "../../../firebase/editMethods";

export default function EditAppointment({
  pet,
  appointment,
  setEditable,
  setAppointment,
  userId,
}: {
  pet: Pet;
  appointment: AppointmentsType | null;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointment: React.Dispatch<React.SetStateAction<AppointmentsType | null>>;
  userId: string;
}) {
  return (
    <>
      <div className="relative w-[300px]">
        <form
          onSubmit={() => {
            if (appointment) {
              editAppointment(userId, pet.name, appointment.id, appointment);
            }
          }}
        >
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={appointment?.title || ""}
              onChange={(e) =>
                setAppointment((prv) =>
                  prv ? { ...prv, title: e.target.value } : null
                )
              }
            />
          </div>
          <div>
            <label htmlFor="doctor">Doctor</label>
            <input
              type="text"
              id="doctor"
              value={appointment?.doctor || ""}
              onChange={(e) =>
                setAppointment((prv) =>
                  prv ? { ...prv, doctor: e.target.value } : null
                )
              }
            />
          </div>
          <div>
            <label htmlFor="start">Date</label>
            <input
              type="start"
              id="start"
              value={
                appointment?.start
                  ? convertDateToInputFormat(appointment.start)
                  : ""
              }
              onChange={(e) =>
                setAppointment((prv) =>
                  prv ? { ...prv, start: e.target.value } : null
                )
              }
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              value={appointment?.time || ""}
              onChange={(e) =>
                setAppointment((prv) =>
                  prv ? { ...prv, time: e.target.value } : null
                )
              }
            />
          </div>
          <div>
            <label htmlFor="notes">Description</label>
            <textarea
              id="notes"
              value={appointment?.description || ""}
              onChange={(e) =>
                setAppointment((prv) =>
                  prv ? { ...prv, description: e.target.value } : null
                )
              }
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
        <button
          className="hide-form-btn remove-btn"
          onClick={() => setEditable((prv) => !prv)}
        >
          <CloseSvg />
        </button>
      </div>
    </>
  );
}
