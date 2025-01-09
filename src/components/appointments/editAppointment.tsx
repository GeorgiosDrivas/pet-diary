import CloseSvg from "@/assets/closeSvg";
import { AppointmentsType } from "@/types";
import React from "react";
import { convertDateToInputFormat } from "@/utils/formatDate";

export default function EditAppointment({
  appointment,
  setEditable,
  setAppointment,
}: {
  appointment: AppointmentsType | null;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointment: React.Dispatch<React.SetStateAction<AppointmentsType | null>>;
}) {
  console.log(appointment);
  return (
    <>
      <div className="relative w-[300px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
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
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={
                appointment?.date
                  ? convertDateToInputFormat(appointment.date)
                  : ""
              }
              onChange={(e) =>
                setAppointment((prv) =>
                  prv ? { ...prv, date: e.target.value } : null
                )
              }
            />
          </div>
          <div>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={appointment?.notes || ""}
              onChange={(e) =>
                setAppointment((prv) =>
                  prv ? { ...prv, notes: e.target.value } : null
                )
              }
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button
          className="hide-form-btn"
          onClick={() => setEditable((prv) => !prv)}
        >
          <CloseSvg />
        </button>
      </div>
    </>
  );
}
