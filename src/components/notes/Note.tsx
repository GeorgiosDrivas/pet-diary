import React, { useState } from "react";
import { NoteType, Pet } from "@/types";
import CloseSvg from "@/assets/closeSvg";
import CreateButton from "@/components/CreateButton";
import SelectPetMessage from "../pet/SelectPet";
import NewNoteForm from "./NewNoteForm";
import NotesTable from "./NotesTable";

export default function Note({
  pet,
  userId,
}: {
  pet: Pet | null;
  userId: string;
}) {
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState<NoteType>({
    id: 1,
    name: "",
    content: "",
  });

  return (
    <>
      <div className="Note rounded-[40px] h-full">
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <NewNoteForm
                userId={userId}
                newNote={newNote}
                setNewNote={setNewNote}
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
                  <NotesTable pet={pet} userId={userId} />
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
