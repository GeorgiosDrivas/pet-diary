import CloseSvg from "@/assets/closeSvg";
import { MedicationType, Pet } from "@/types";
import React from "react";
import { editMedication } from "../../../firebase/editMethods";

export default function EditMedication({
  pet,
  medication,
  setEditable,
  setMedication,
}: {
  pet: Pet;
  medication: MedicationType | null;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setMedication: React.Dispatch<React.SetStateAction<MedicationType | null>>;
}) {
  return (
    <>
      <div className="relative w-[300px]">
        <form
          onSubmit={() => {
            if (medication) {
              editMedication(1, pet.name, medication.id, medication);
            }
          }}
        >
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={medication?.medicationName || ""}
              onChange={(e) =>
                setMedication((prv) =>
                  prv ? { ...prv, medicationName: e.target.value } : null
                )
              }
            />
          </div>
          <div>
            <label htmlFor="dosage">Dosage</label>
            <input
              type="text"
              id="dosage"
              value={medication?.dosage || ""}
              onChange={(e) =>
                setMedication((prv) =>
                  prv ? { ...prv, dosage: e.target.value } : null
                )
              }
            />
          </div>
          <div>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={medication?.notes || ""}
              onChange={(e) =>
                setMedication((prv) =>
                  prv ? { ...prv, notes: e.target.value } : null
                )
              }
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button
          className="hide-form-btn"
          onClick={() => setEditable((prv) => !prv)}
        >
          <CloseSvg />
        </button>
      </div>
    </>
  );
}
