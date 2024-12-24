import React, { useState } from "react";
import { addMedication } from "../../firebase/client";

export default function Medication({ pet }: { pet: any }) {
  const [showForm, setShowForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    medicationName: "",
    dosage: "",
    date: "",
    notes: "",
  });

  const handleNewMedication = () => {
    addMedication(1, pet.name, newMedication);
  };

  return (
    <>
      <div className="medication h-full px-8 py-5">
        <h2>Appointments</h2>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g id="Menu / Close_MD">
                    <path
                      id="Vector"
                      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </div>
          ) : (
            <>
              {pet ? (
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
                      pet.medications.map((medication: any, index: any) => (
                        <tr key={index} className="border-b border-[#e5e7eb]">
                          <td className="text-center py-3">
                            {medication.medicationName}
                          </td>
                          <td className="text-center py-3">
                            {medication.dosage}
                          </td>
                          <td className="text-center py-3">
                            {medication.notes || "No notes"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No medications available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <p>Please select a pet to view medications.</p>
              )}
              <button className="mt-4" onClick={() => setShowForm(true)}>
                Create an medication
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
