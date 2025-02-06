import { Pet } from "@/types";
import React, { useState } from "react";
import EditPetDetails from "./editPetDetails";
import EditSvg from "@/assets/editSvg";
import { removePet } from "../../firebase/deleteMethods";
import DeleteSvg from "@/assets/deleteSvg";

export default function PetDetails({
  pet,
  userId,
}: {
  pet: Pet | null;
  userId: string;
}) {
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
              onClick={() => removePet(userId, pet.name)}
              className="ms-2 remove-btn"
            >
              <DeleteSvg />
            </button>
          </div>
          <div className="flex flex-col justify-between items-start">
            {edit ? (
              <EditPetDetails setEdit={setEdit} pet={pet} />
            ) : (
              <>
                <p>Species: {pet.species}</p>
                <p>Breed: {pet.breed}</p>
                <p>Age: {pet.age}</p>
                <h3 className="mt-3 mb-2">Details</h3>
                <p>Appointments: {pet.appointments.length}</p>
                <p>Medications: {pet.medications.length}</p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
