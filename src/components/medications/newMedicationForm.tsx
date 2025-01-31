import React from "react";
import { MedicationType, Pet } from "@/types";
import { handleNewItem } from "@/utils/newItem";
import { stateChange } from "@/utils/stateChange";
import { addMedication } from "../../../firebase/addMethods";

export default function NewMedicationForm({
  newMedication,
  setNewMedication,
  pet,
}: {
  newMedication: MedicationType;
  setNewMedication: React.Dispatch<React.SetStateAction<MedicationType>>;
  pet: Pet | null;
}) {
  return (
    <>
      <form onSubmit={() => handleNewItem(pet, addMedication, newMedication)}>
        <div>
          <label htmlFor="medicationName">Medication Name</label>
          <input
            type="text"
            id="medicationName"
            value={newMedication.medicationName}
            onChange={(e) =>
              stateChange(e, "medicationName", setNewMedication, newMedication)
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
              stateChange(e, "dosage", setNewMedication, newMedication)
            }
          />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={newMedication.notes}
            onChange={(e) =>
              stateChange(e, "notes", setNewMedication, newMedication)
            }
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
}
