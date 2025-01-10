import React, { useState } from "react";
import { removeMedication } from "../../firebase/deleteMethods";
import { MedicationType, Pet } from "@/types";
import EditSvg from "@/assets/editSvg";
import DeleteSvg from "@/assets/deleteSvg";
import CloseSvg from "@/assets/closeSvg";
import CreateButton from "@/utils/createButton";
import NewMedicationForm from "./medications/newMedicationForm";

export default function Medication({ pet }: { pet: Pet | null }) {
  const [showForm, setShowForm] = useState(false);
  const [newMedication, setNewMedication] = useState<MedicationType>({
    id: "1",
    medicationName: "",
    dosage: "",
    notes: "",
  });

  const removeMedicationFn = (pet: Pet, index: string) => {
    window.location.reload();
    removeMedication(1, pet?.name, index);
    alert("Medication removed successfully.");
  };

  return (
    <>
      <div className="medication h-full px-8 py-5">
        <h2>Medication</h2>
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <NewMedicationForm
                newMedication={newMedication}
                setNewMedication={setNewMedication}
                pet={pet}
              />
              <button
                className="hide-form-btn"
                onClick={() => setShowForm((prv: boolean) => !prv)}
              >
                <CloseSvg />
              </button>
            </div>
          ) : (
            <>
              {pet ? (
                <>
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
                            <tr
                              key={index}
                              className="border-b border-[#e5e7eb]"
                            >
                              <td className="text-center py-3">
                                {medication.medicationName}
                              </td>
                              <td className="text-center py-3">
                                {medication.dosage}
                              </td>
                              <td className="text-center py-3">
                                {medication.notes || "No notes"}
                              </td>
                              <td className="text-center py-3">
                                <button className="me-3 my-2">
                                  <EditSvg />
                                </button>
                                <button
                                  className="my-2"
                                  onClick={() =>
                                    removeMedicationFn(pet, medication.id)
                                  }
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
                  <CreateButton
                    showForm={setShowForm}
                    text="Create a medication"
                  />
                </>
              ) : (
                <p>Please select a pet to view medications.</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
