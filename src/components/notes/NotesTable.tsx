import React, { useState } from "react";
import DeleteSvg from "@/assets/deleteSvg";
import EditSvg from "@/assets/editSvg";
import { NoteType, Pet } from "@/types";
import { removeNote } from "../../../firebase/deleteMethods";
import EditNote from "./EditNote";

export default function NotesTable({
  pet,
  userId,
}: {
  pet: Pet;
  userId: string;
}) {
  const [editItem, setEditItem] = useState(false);
  const [editableNote, setEditableNote] = useState<NoteType | null>(null);

  const removeNoteFn = (pet: Pet, index: string) => {
    removeNote(userId, pet?.name, index);
  };

  const editNote = (Note: NoteType) => {
    setEditItem(true);
    setEditableNote(Note);
  };

  const hasNotes =
    pet.Notes &&
    pet.Notes.some((note) => note.Notes && note.Notes.trim() !== "");

  return (
    <>
      {editItem ? (
        <EditNote
          pet={pet}
          Note={editableNote}
          setNote={setEditableNote}
          setEditable={setEditItem}
          userId={userId}
        />
      ) : (
        <table className="w-full border-none">
          <thead>
            <tr>
              <th>Note Name</th>
              <th>Dosage</th>
              {hasNotes && <th>Notes</th>}
            </tr>
          </thead>
          <tbody>
            {pet.Notes && pet.Notes.length > 0 ? (
              pet.Notes.map((note: NoteType, index: number) => (
                <tr key={index} className="border-b border-[#e5e7eb]">
                  <td className="text-center py-3">{note.NoteName}</td>
                  <td className="text-center py-3">{note.dosage}</td>
                  <td className="text-center py-3">{note.Notes}</td>
                  <td className="text-center py-3">
                    <button
                      className="me-3 my-2 edit-btn"
                      onClick={() => editNote(note)}
                    >
                      <EditSvg />
                    </button>
                    <button
                      className="my-2 remove-btn"
                      onClick={() => removeNoteFn(pet, note.id)}
                    >
                      <DeleteSvg />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No Notes available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}
