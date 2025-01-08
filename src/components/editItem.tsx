import { AppointmentsType } from "@/types";
import React from "react";

export default function EditItem({
  appointment,
}: {
  appointment: AppointmentsType | null;
}) {
  return (
    <>
      <div className="relative w-[300px]">
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" defaultValue={appointment?.title} />
          </div>
          <div>
            <label htmlFor="doctor">Doctor</label>
            <input type="text" id="doctor" defaultValue={appointment?.doctor} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" defaultValue={appointment?.date} />
          </div>
          <div>
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" defaultValue={appointment?.notes} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
