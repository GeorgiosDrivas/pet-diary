import React from "react";
import { AppointmentsType } from "@/types";

export default function EventModal({
  calendarEvent,
  edit,
  deleteFn,
}: {
  calendarEvent: AppointmentsType;
  edit: (appointment: AppointmentsType) => void;
  deleteFn: (id: string) => void;
}) {
  return (
    <div className="sx__event-modal sx__event-modal-default is-open">
      {calendarEvent.title}
      <button onClick={() => edit(calendarEvent)}>Edit</button>
      <button onClick={() => deleteFn(calendarEvent.id)}>Delete</button>
    </div>
  );
}
