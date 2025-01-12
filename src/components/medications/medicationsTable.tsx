import React, { useState } from "react";
import DeleteSvg from "@/assets/deleteSvg";
import EditSvg from "@/assets/editSvg";
import { MedicationType, Pet } from "@/types";
import { removeMedication } from "../../../firebase/deleteMethods";
import EditMedication from "./editMedication";

export default function MedicationsTable({ pet }: { pet: Pet }) {
  const [editItem, setEditItem] = useState(false);
  const [editableMedication, setEditableMedication] =
    useState<MedicationType | null>(null);

  const removeMedicationFn = (pet: Pet, index: string) => {
    window.location.reload();
    removeMedication(1, pet?.name, index);
    alert("Medication removed successfully.");
  };

  const editMedication = (medication: MedicationType) => {
    setEditItem(true);
    setEditableMedication(medication);
  };

  return (
    <>
      {editItem ? (
        <EditMedication
          pet={pet}
          medication={editableMedication}
          setMedication={setEditableMedication}
          setEditable={setEditItem}
        />
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Dosage</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {pet.medications.length > 0 ? (
              pet.medications.map(
                (medication: MedicationType, index: number) => (
                  <tr key={index} className="border-b border-[#e5e7eb]">
                    <td className="text-center py-3">
                      {medication.medicationName}
                    </td>
                    <td className="text-center py-3">{medication.dosage}</td>
                    <td className="text-center py-3">
                      {medication.notes || "No notes"}
                    </td>
                    <td className="text-center py-3">
                      <button
                        className="me-3 my-2"
                        onClick={() => editMedication(medication)}
                      >
                        <EditSvg />
                      </button>
                      <button
                        className="my-2"
                        onClick={() => removeMedicationFn(pet, medication.id)}
                      >
                        <DeleteSvg />
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No medications available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}
