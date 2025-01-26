import React from "react";

export default function EventTimeSvg() {
  return (
    <>
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
    </>
  );
}
