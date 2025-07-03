import { Pet } from "@/types";
import React from "react";
import { editNote } from "../../../firebase/editMethods";
import { noteSchema, noteSchemaType } from "@/schemas/notesSchemas";

export default function EditNote({
  userId,
  pet,
  Note,
  setEditable,
  setNote,
}: {
  userId: string;
  pet: Pet;
  Note: noteSchemaType | null;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setNote: React.Dispatch<React.SetStateAction<noteSchemaType | null>>;
}) {
  const handleSubmit = () => {
    const schemaResult = noteSchema.safeParse(Note);

    if (schemaResult.success) {
      if (Note) {
        editNote(userId, pet.name, Note.id, Note);
      }
    }
  };

  return (
    <>
      <div className="relative w-[300px]">
        <form
          onSubmit={() => {
            handleSubmit();
          }}
        >
          <div>
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={Note?.name || ""}
              onChange={(e) =>
                setNote((prv) =>
                  prv ? { ...prv, name: e.target.value } : null
                )
              }
            />
          </div>
          <div className="flex justify-between my-4">
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button
              className="remove-btn"
              onClick={() => setEditable((prv) => !prv)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
