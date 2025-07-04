import { editNoteTypes } from "@/types";
import React from "react";
import { editNote } from "../../../firebase/editMethods";
import { noteSchema, noteSchemaType } from "@/schemas/notesSchemas";
import { useForm } from "react-hook-form";

export default function EditNote({
  userId,
  pet,
  Note,
  setEditable,
}: editNoteTypes) {
  const { register, handleSubmit } = useForm<noteSchemaType>({
    defaultValues: {
      title: Note?.title,
      content: Note?.content,
    },
  });

  const onSubmit = (data: noteSchemaType) => {
    const schemaResult = noteSchema.safeParse(Note);

    if (schemaResult.success) {
      if (Note) {
        editNote(userId, pet.id, Note.id, data);
      }
    } else {
      console.error("Validation failed", schemaResult.error.format());
    }
  };

  return (
    <>
      <div className="relative w-[300px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" {...register("title")} />
          </div>
          <div>
            <label htmlFor="title">Content</label>
            <input type="text" id="content" {...register("content")} />
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
