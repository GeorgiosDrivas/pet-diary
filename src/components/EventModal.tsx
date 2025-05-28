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
      <h3>{calendarEvent.title}</h3>
      <div className="event-time-wrap">
        <div className="flex flex-row items-center justify-start">
          <EventTimeSvg />
          <p>{calendarEvent.time}</p>
        </div>
        <p>{calendarEvent.start}</p>
      </div>
      <div className="event-doctor-wrap">
        <p>
          Doctor: <span>{calendarEvent.doctor}</span>
        </p>
      </div>
      {calendarEvent.description && (
        <div className="event-description-wrap">
          <p>
            Description:
            <span className="block">{calendarEvent.description}</span>
          </p>
        </div>
      )}
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
