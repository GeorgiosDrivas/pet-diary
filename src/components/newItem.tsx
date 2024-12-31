import React from "react";
import { AppointmentsType } from "@/types";

interface NewItemProps {
  appointment: AppointmentsType;
}

export default function NewItem({ appointment }: NewItemProps) {
  return (
    <>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={appointment.title} />
        </div>
        <div>
          <label htmlFor="doctor">Doctor</label>
          <input type="text" id="doctor" value={appointment.doctor} />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" value={appointment.date} />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" value={appointment.notes} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
