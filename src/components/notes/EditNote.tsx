import { NoteType, Pet } from "@/types";
import React from "react";
import { editNote } from "../../../firebase/editMethods";

export default function EditNote({
  userId,
  pet,
  Note,
  setEditable,
  setNote,
}: {
  userId: string;
  pet: Pet;
  Note: NoteType | null;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setNote: React.Dispatch<React.SetStateAction<NoteType | null>>;
}) {
  return (
    <>
      <div className="relative w-[300px]">
        <form
          onSubmit={() => {
            if (Note) {
              editNote(userId, pet.name, Note.id, Note);
            }
          }}
        >
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={Note?.NoteName || ""}
              onChange={(e) =>
                setNote((prv) =>
                  prv ? { ...prv, NoteName: e.target.value } : null
                )
              }
            />
          </div>
          <div>
            <label htmlFor="Notes">Notes</label>
            <textarea
              id="Notes"
              value={Note?.Notes || ""}
              onChange={(e) =>
                setNote((prv) =>
                  prv ? { ...prv, Notes: e.target.value } : null
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
