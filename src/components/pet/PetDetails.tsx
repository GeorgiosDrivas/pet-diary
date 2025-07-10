import React, { useState } from "react";
import EditPetDetails from "./EditPetDetails";
import EditSvg from "@/assets/editSvg";
import { removePet } from "../../../firebase/deleteMethods";
import DeleteSvg from "@/assets/deleteSvg";
import { useAppContext } from "@/context/appContext";

export default function PetDetails({ userId }: { userId: string }) {
  const [edit, setEdit] = useState(false);
  const { currentPet } = useAppContext();

  return (
    <>
      {currentPet && (
        <>
          <div className="inline-flex mt-8">
            <h1 className="me-2">{currentPet.name}</h1>
            <button onClick={() => setEdit((prv) => !prv)} className="edit-btn">
              <EditSvg />
            </button>
            <button
              onClick={() => removePet(userId, currentPet.name)}
              className="ms-2 remove-btn"
            >
              <DeleteSvg />
            </button>
          </div>
          <div className="table-container flex flex-col justify-between items-start">
            {edit ? (
              <EditPetDetails setEdit={setEdit} userId={userId} />
            ) : (
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-start">Species</th>
                    <th className="text-start">Breed</th>
                    <th className="text-start">Weight</th>
                    <th className="text-start">Age</th>
                    <th className="text-start">Appointments</th>
                    <th className="text-start">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{currentPet.species}</td>
                    <td>{currentPet.breed}</td>
                    <td>{currentPet.weight}</td>
                    <td>{currentPet.age}</td>
                    <td>
                      {currentPet.appointments
                        ? currentPet.appointments.length
                        : "0"}
                    </td>
                    <td>{currentPet.notes ? currentPet.notes.length : "0"}</td>
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
