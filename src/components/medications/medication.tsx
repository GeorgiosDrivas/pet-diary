import React, { useState } from "react";
import { MedicationType, Pet } from "@/types";
import CloseSvg from "@/assets/closeSvg";
import CreateButton from "@/utils/createButton";
import NewMedicationForm from "./newMedicationForm";
import MedicationsTable from "./medicationsTable";
import SelectPetMessage from "../selectPet";

export default function Medication({
  pet,
  userId,
}: {
  pet: Pet | null;
  userId: string;
}) {
  const [showForm, setShowForm] = useState(false);
  const [newMedication, setNewMedication] = useState<MedicationType>({
    id: "1",
    medicationName: "",
    dosage: "",
    notes: "",
  });

  return (
    <>
      <div className="medication rounded-[40px] h-full px-8 py-5">
        <h2>Medication</h2>
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <NewMedicationForm
                userId={userId}
                newMedication={newMedication}
                setNewMedication={setNewMedication}
                pet={pet}
              />
              <button
                className="hide-form-btn remove-btn"
                onClick={() => setShowForm((prv: boolean) => !prv)}
              >
                <CloseSvg />
              </button>
            </div>
          ) : (
            <>
              {pet ? (
                <>
                  <MedicationsTable pet={pet} userId={userId} />
                  <CreateButton
                    showForm={setShowForm}
                    text="Create a medication"
                  />
                </>
              ) : (
                <SelectPetMessage message="Please select a pet to view medications." />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
