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
      <button className="mt-4" onClick={() => showForm(true)}>
        {text}
      </button>
    </>
  );
}
