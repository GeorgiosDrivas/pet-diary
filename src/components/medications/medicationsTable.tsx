import React, { useState } from "react";
import DeleteSvg from "@/assets/deleteSvg";
import EditSvg from "@/assets/editSvg";
import { MedicationType, Pet } from "@/types";
import { removeMedication } from "../../../firebase/deleteMethods";
import EditMedication from "./editMedication";

export default function MedicationsTable({
  pet,
  userId,
}: {
  pet: Pet;
  userId: string;
}) {
  const [editItem, setEditItem] = useState(false);
  const [editableMedication, setEditableMedication] =
    useState<MedicationType | null>(null);

  const removeMedicationFn = (pet: Pet, index: string) => {
    removeMedication(userId, pet?.name, index);
  };

  const editMedication = (medication: MedicationType) => {
    setEditItem(true);
    setEditableMedication(medication);
  };

  const hasNotes =
    pet.medications &&
    pet.medications.some(
      (medication) => medication.notes && medication.notes.trim() !== ""
    );

  return (
    <>
      {editItem ? (
        <EditMedication
          pet={pet}
          medication={editableMedication}
          setMedication={setEditableMedication}
          setEditable={setEditItem}
          userId={userId}
        />
      ) : (
        <table className="w-full border-none">
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Dosage</th>
              {hasNotes && <th>Notes</th>}
            </tr>
          </thead>
          <tbody>
            {pet.medications && pet.medications.length > 0 ? (
              pet.medications.map(
                (medication: MedicationType, index: number) => (
                  <tr key={index} className="border-b border-[#e5e7eb]">
                    <td className="text-center py-3">
                      {medication.medicationName}
                    </td>
                    <td className="text-center py-3">{medication.dosage}</td>
                    <td className="text-center py-3">{medication.notes}</td>
                    <td className="text-center py-3">
                      <button
                        className="me-3 my-2 edit-btn"
                        onClick={() => editMedication(medication)}
                      >
                        <EditSvg />
                      </button>
                      <button
                        className="my-2 remove-btn"
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
