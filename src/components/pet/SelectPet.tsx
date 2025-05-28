import React from "react";
export default function SelectPetMessage({
  message,
  cls,
}: {
  message: string;
  cls: string;
}) {
  return (
    <>
      <p className={cls}>{message}</p>
    </>
  );
}
