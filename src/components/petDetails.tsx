import { Pet } from "@/types";
import React, { useState } from "react";
import EditPetDetails from "./editPetDetails";
import EditSvg from "@/assets/editSvg";
import { removePet } from "../../firebase/deleteMethods";
import DeleteSvg from "@/assets/deleteSvg";

export default function PetDetails({ pet }: { pet: Pet | null }) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {pet && (
        <>
          <div className="inline-flex">
            <h2 className="me-2">{pet.name}</h2>
            <button onClick={() => setEdit((prv) => !prv)} className="edit-btn">
              <EditSvg />
            </button>
            <button
              onClick={() => removePet(1, pet.name)}
              className="ms-2 remove-btn"
            >
              <DeleteSvg />
            </button>
          </div>
          <div className="flex flex-row justify-between items-center">
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
