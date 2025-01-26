import React from "react";
import { CalendarEvent } from "@/types";
import EditSvg from "@/assets/editSvg";
import DeleteSvg from "@/assets/deleteSvg";
import EventTimeSvg from "@/assets/EventTimeSvg";

export default function EventModal({
  calendarEvent,
  edit,
  deleteFn,
}: {
  calendarEvent: CalendarEvent;
  edit: (appointment: CalendarEvent) => void;
  deleteFn: (id: string) => void;
}) {
  return (
    <div className="sx__event-modal sx__event-modal-default is-open">
      {calendarEvent.title}
      <div className="event-time-wrap">
        <EventTimeSvg />
        {calendarEvent.start}
      </div>
      <div className="event-description-wrap">{calendarEvent.description}</div>
      <div>
        <button
          className="create-item-button me-4"
          onClick={() => edit(calendarEvent)}
        >
          <EditSvg />
        </button>
        <button
          className="create-item-button"
          onClick={() => deleteFn(calendarEvent.id)}
        >
          <DeleteSvg />
        </button>
      </div>
    </div>
  );
}
