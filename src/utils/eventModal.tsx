import React from "react";
import EditSvg from "@/assets/editSvg";
import DeleteSvg from "@/assets/deleteSvg";
import EventTimeSvg from "@/assets/EventTimeSvg";
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
      <div className="event-time-wrap grid items-start">
        <EventTimeSvg />
        {calendarEvent.start}
      </div>
      <div className="event-description-wrap">{calendarEvent.description}</div>
      <div>
        <button className="edit-btn me-4" onClick={() => edit(calendarEvent)}>
          <EditSvg />
        </button>
        <button
          className="remove-btn"
          onClick={() => deleteFn(calendarEvent.id)}
        >
          <DeleteSvg />
        </button>
      </div>
    </div>
  );
}
