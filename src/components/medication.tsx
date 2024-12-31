import React, { useState } from "react";
import { addMedication } from "../../firebase/client";
import { MedicationType, Pet } from "@/types";
import EditSvg from "@/assets/editSvg";
import DeleteSvg from "@/assets/deleteSvg";
import CloseSvg from "@/assets/closeSvg";
import CreateButton from "@/utils/createButton";

export default function Medication({ pet }: { pet: Pet | null }) {
  const [showForm, setShowForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    id: 1,
    medicationName: "",
    dosage: "",
    date: "",
    notes: "",
  });

  const handleNewMedication = () => {
    if (pet) {
      addMedication(1, pet.name, newMedication);
    } else {
      console.error("No pet selected for adding a medication.");
    }
  };

  return (
    <>
      <div className="medication h-full px-8 py-5">
        <h2>Medication</h2>
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <form>
                <div>
                  <label htmlFor="medicationName">Medication Name</label>
                  <input
                    type="text"
                    id="medicationName"
                    value={newMedication.medicationName}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        medicationName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="dosage">Dosage</label>
                  <input
                    type="text"
                    id="dosage"
                    value={newMedication.dosage}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        dosage: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    value={newMedication.notes}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>
                <button onClick={() => handleNewMedication()}>Submit</button>
              </form>
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
                            <>
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
                                <button className="me-3 my-2">
                                  <EditSvg />
                                </button>
                                <button className="my-2">
                                  <DeleteSvg />
                                </button>
                              </tr>
                            </>
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
