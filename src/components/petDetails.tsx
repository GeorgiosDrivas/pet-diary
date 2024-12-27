import { Pet } from "@/types";
import React from "react";

export default function PetDetails({ pet }: { pet: Pet | null }) {
  return (
    <div className="py-3 details px-8 h-[50%] self-center ">
      {pet && (
        <>
          <h2>Pet Details</h2>
          <h2>Name: {pet.name}</h2>
          <p>Species: {pet.species}</p>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
        </>
      )}
    </div>
  );
}
