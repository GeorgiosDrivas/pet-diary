import React, { useState } from "react";
import { NoteType, Pet } from "@/types";
import { handleNewItem } from "@/utils/newItem";
import { stateChange } from "@/utils/stateChange";
import { addNote } from "../../../firebase/addMethods";
import { noteSchema } from "@/schemas/notesSchemas";

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
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof newNote, string>>
  >({});

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const result = noteSchema.safeParse(newNote);
    if (result.success) {
      handleNewItem(userId, pet, addNote, newNote);
    } else {
      e.preventDefault();
      const fieldErrors: typeof errors = {};

      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof newNote;
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div>
          <label htmlFor="NoteName">Note Name</label>
          <input
            type="text"
            id="NoteName"
            value={newNote.name}
            onChange={(e) => stateChange(e, "name", setNewNote, newNote)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="Notes">Notes</label>
          <textarea
            id="Notes"
            value={newNote.content}
            onChange={(e) => stateChange(e, "content", setNewNote, newNote)}
          />
          {errors.content && <p className="error">{errors.content}</p>}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
}
