import React from "react";

export default function CreateButton({
  showForm,
  text,
}: {
  showForm: (value: boolean) => void;
  text: string;
}) {
  return (
    <>
      <button
        className="create-item-button mt-3"
        onClick={() => showForm(true)}
      >
        {text}
      </button>
    </>
  );
}
