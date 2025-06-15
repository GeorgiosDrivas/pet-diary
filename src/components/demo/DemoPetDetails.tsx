import { Pet } from "@/types";
import React from "react";

export default function DemoPetDetails({ pet }: { pet: Pet | null }) {
  return (
    <>
      {pet && (
        <>
          <div className="inline-flex mt-8">
            <h1 className="me-2">{pet.name}</h1>
          </div>
        </>
      )}
    </>
  );
}
