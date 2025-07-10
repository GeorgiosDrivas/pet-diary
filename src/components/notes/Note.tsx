import React, { useState } from "react";
import CloseSvg from "@/assets/closeSvg";
import CreateButton from "@/components/CreateButton";
import SelectPetMessage from "../pet/SelectPet";
import NewNoteForm from "./NewNoteForm";
import NotesTable from "./NotesTable";
import { useAppContext } from "@/context/appContext";

export default function Note({ userId }: { userId: string }) {
  const [showForm, setShowForm] = useState(false);
  const { currentPet } = useAppContext();

  return (
    <>
      <div className="Note rounded-[40px] h-full">
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <NewNoteForm userId={userId} />
              <button
                className="hide-form-btn remove-btn"
                onClick={() => setShowForm((prv: boolean) => !prv)}
              >
                <CloseSvg />
              </button>
            </div>
          ) : (
            <>
              {currentPet ? (
                <>
                  <NotesTable userId={userId} />
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
