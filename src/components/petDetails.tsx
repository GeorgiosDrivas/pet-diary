import { Pet } from "@/types";
import React, { useState } from "react";
import EditPetDetails from "./editPetDetails";
import EditSvg from "@/assets/editSvg";
import { removePet } from "../../firebase/deleteMethods";
import DeleteSvg from "@/assets/deleteSvg";

export default function PetDetails({ pet }: { pet: Pet | null }) {
  const [edit, setEdit] = useState(false);

  const removePetFn = (userId: number, petName: string) => {
    window.location.reload();
    removePet(userId, petName);
  };

  return (
    <>
      {pet && (
        <>
          <div>
            <h2 className="me-2">{pet.name}</h2>
            <button onClick={() => setEdit((prv) => !prv)}>
              <EditSvg />
            </button>
            <button onClick={() => removePetFn(1, pet.name)} className="ms-3">
              <DeleteSvg />
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
