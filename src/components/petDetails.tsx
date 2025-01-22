import { Pet } from "@/types";
import React, { useState } from "react";
import EditPetDetails from "./editPetDetails";
import EditSvg from "@/assets/editSvg";

export default function PetDetails({ pet }: { pet: Pet | null }) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {pet && (
        <>
          <div>
            <h2 className="me-2">{pet.name}</h2>
            <button onClick={() => setEdit((prv) => !prv)}>
              <EditSvg />
            </button>
          </div>
          <div>
            {edit ? (
              <EditPetDetails setEdit={setEdit} pet={pet} />
            ) : (
              <>
                <p>Species: {pet.species}</p>
                <p>Breed: {pet.breed}</p>
                <p>Age: {pet.age}</p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
