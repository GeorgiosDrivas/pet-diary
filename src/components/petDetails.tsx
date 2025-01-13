import { Pet } from "@/types";
import React, { useState } from "react";
import EditPetDetails from "./editPetDetails";

export default function PetDetails({ pet }: { pet: Pet | null }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="py-3 details px-8 h-[50%] self-center ">
      {pet && (
        <>
          <div>
            {edit ? (
              <EditPetDetails setEdit={setEdit} pet={pet} />
            ) : (
              <>
                <h2>Pet Details</h2>
                <h2>Name: {pet.name}</h2>
                <p>Species: {pet.species}</p>
                <p>Breed: {pet.breed}</p>
                <p>Age: {pet.age}</p>
                <button className="mt-3" onClick={() => setEdit((prv) => !prv)}>
                  Edit pet details
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
