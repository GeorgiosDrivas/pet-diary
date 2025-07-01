import React from "react";
import { NoteType, Pet } from "@/types";
import { handleNewItem } from "@/utils/newItem";
import { stateChange } from "@/utils/stateChange";
import { addNote } from "../../../firebase/addMethods";

export default function NewNoteForm({
  userId,
  newNote,
  setNewNote,
  pet,
}: {
  userId: string;
  newNote: NoteType;
  setNewNote: React.Dispatch<React.SetStateAction<NoteType>>;
  pet: Pet | null;
}) {
  return (
    <>
      <form onSubmit={() => handleNewItem(userId, pet, addNote, newNote)}>
        <div>
          <label htmlFor="NoteName">Note Name</label>
          <input
            type="text"
            id="NoteName"
            value={newNote.NoteName}
            onChange={(e) => stateChange(e, "NoteName", setNewNote, newNote)}
          />
        </div>
        <div>
          <label htmlFor="Notes">Notes</label>
          <textarea
            id="Notes"
            value={newNote.Notes}
            onChange={(e) => stateChange(e, "Notes", setNewNote, newNote)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
}
