import React, { useState } from "react";
import DeleteSvg from "@/assets/deleteSvg";
import EditSvg from "@/assets/editSvg";
import { Pet } from "@/types";
import { removeNote } from "../../../firebase/deleteMethods";
import EditNote from "./EditNote";
import { noteSchemaType } from "@/schemas/notesSchemas";

export default function NotesTable({
  pet,
  userId,
}: {
  pet: Pet;
  userId: string;
}) {
  const [editItem, setEditItem] = useState(false);
  const [editableNote, setEditableNote] = useState<noteSchemaType | null>(null);

  const removeNoteFn = (pet: Pet, index: string) => {
    removeNote(userId, pet?.name, index);
  };

  const editNote = (Note: noteSchemaType) => {
    setEditItem(true);
    setEditableNote(Note);
  };

  return (
    <>
      {editItem ? (
        <EditNote
          pet={pet}
          Note={editableNote}
          setEditable={setEditItem}
          userId={userId}
        />
      ) : pet.notes && pet.notes.length > 0 ? (
        <table className="w-full border-none">
          <thead>
            <tr>
              <th className="text-start">Note Title</th>
              <th className="text-start">Content</th>
            </tr>
          </thead>
          <tbody>
            {pet.notes.map((note: noteSchemaType, index: number) => (
              <tr key={index} className="border-b border-[#e5e7eb]">
                <td className="py-3">{note.title}</td>
                <td className="py-3">{note.content}</td>
                <td className="py-3">
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
            ))}
          </tbody>
        </table>
      ) : (
        <tr>
          <td colSpan={4} className="text-center">
            No Notes available.
          </td>
        </tr>
      )}
    </>
  );
}
