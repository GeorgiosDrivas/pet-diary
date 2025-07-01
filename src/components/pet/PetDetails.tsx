import { Pet } from "@/types";
import React, { useState } from "react";
import EditPetDetails from "./EditPetDetails";
import EditSvg from "@/assets/editSvg";
import { removePet } from "../../../firebase/deleteMethods";
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
          <div className="inline-flex mt-8">
            <h1 className="me-2">{pet.name}</h1>
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
          <div className="table-container flex flex-col justify-between items-start">
            {edit ? (
              <EditPetDetails setEdit={setEdit} pet={pet} userId={userId} />
            ) : (
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-start">Species</th>
                    <th className="text-start">Breed</th>
                    <th className="text-start">Age</th>
                    <th className="text-start">Appointments</th>
                    <th className="text-start">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{pet.species}</td>
                    <td>{pet.breed}</td>
                    <td>{pet.age}</td>
                    <td>{pet.appointments?.length}</td>
                    <td>{pet.Notes?.length}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </>
  );
}
