import { editNoteTypes } from "@/types";
import React from "react";
import { editNote } from "../../../firebase/editMethods";
import { NoteInput, noteInputSchema } from "@/schemas/notesSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function EditNote({
  userId,
  pet,
  Note,
  setEditable,
}: editNoteTypes) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteInput>({
    defaultValues: {
      title: Note?.title,
      content: Note?.content,
    },
    resolver: zodResolver(noteInputSchema),
  });

  const onSubmit = (data: NoteInput) => {
    if (Note) {
      editNote(userId, pet.id, Note.id, { ...data, id: Note.id });
    }
  };

  return (
    <>
      <div className="relative w-[300px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" {...register("title")} />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <input type="text" id="content" {...register("content")} />
            {errors.content && (
              <p className="error">{errors.content.message}</p>
            )}
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
