import React, { useState } from "react";
import { Pet } from "@/types";
import CloseSvg from "@/assets/closeSvg";
import CreateButton from "@/components/CreateButton";
import SelectPetMessage from "../pet/SelectPet";
import NewNoteForm from "./NewNoteForm";
import NotesTable from "./NotesTable";

export default function Note({
  pet,
  userId,
  refreshUserData,
}: {
  pet: Pet | null;
  userId: string;
  refreshUserData: () => Promise<void>;
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="Note rounded-[40px] h-full">
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <NewNoteForm
                userId={userId}
                pet={pet}
                refreshUserData={refreshUserData}
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
                  <NotesTable
                    pet={pet}
                    userId={userId}
                    refreshUserData={refreshUserData}
                  />
                  <CreateButton showForm={setShowForm} text="Create a Note" />
                </>
              ) : (
                <SelectPetMessage
                  message="Please select a pet to view Notes."
                  cls="select-pet-msg text-center"
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
