import React from "react";

export default function NewSvg({ onClick }: { onClick: () => void }) {
  return (
    <>
      <svg
        className="new-pet-svg cursor-pointer"
        onClick={() => onClick()}
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 12H18M12 6V18"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
