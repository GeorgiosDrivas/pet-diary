import React from "react";
import { CalendarEvent } from "@/types";
import EditSvg from "@/assets/editSvg";
import DeleteSvg from "@/assets/deleteSvg";

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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sx__event-icon"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M12 8V12L15 15"
              stroke="var(--sx-internal-color-text)"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="var(--sx-internal-color-text)"
              strokeWidth="2"
            ></circle>
          </g>
        </svg>
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
