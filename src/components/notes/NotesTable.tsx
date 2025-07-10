import React, { useState } from "react";
import DeleteSvg from "@/assets/deleteSvg";
import EditSvg from "@/assets/editSvg";
import { Pet } from "@/types";
import { removeNote } from "../../../firebase/deleteMethods";
import EditNote from "./EditNote";
import { noteSchemaType } from "@/schemas/notesSchemas";
import { useAppContext } from "@/context/appContext";

export default function NotesTable({ userId }: { userId: string }) {
  const [editItem, setEditItem] = useState(false);
  const [editableNote, setEditableNote] = useState<noteSchemaType | null>(null);
  const { refreshUserData, user, currentPet } = useAppContext();

  const removeNoteFn = async (pet: Pet, index: string) => {
    await removeNote(userId, pet?.name, index);
    await refreshUserData(user);
  };

  const editNote = (Note: noteSchemaType) => {
    setEditItem(true);
    setEditableNote(Note);
  };

  return (
    <>
      {editItem ? (
        <EditNote
          Note={editableNote}
          setEditable={setEditItem}
          userId={userId}
        />
      ) : currentPet?.notes && currentPet.notes.length > 0 ? (
        <table className="w-full border-none">
          <thead>
            <tr>
              <th className="text-start">Note Title</th>
              <th className="text-start">Content</th>
            </tr>
          </thead>
          <tbody>
            {currentPet.notes.map((note: noteSchemaType, index: number) => (
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
                    onClick={() => removeNoteFn(currentPet, note.id)}
                  >
                    <DeleteSvg />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p className="text-start">No Notes available.</p>
        </div>
      )}
    </>
  );
}
