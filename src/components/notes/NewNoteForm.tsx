import React, { useEffect } from "react";
import { newNoteFormTypes } from "@/types";
import { addNote } from "../../../firebase/addMethods";
import { NoteInput, noteInputSchema } from "@/schemas/notesSchemas";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";

export default function NewNoteForm({
  userId,
  pet,
  refreshUserData,
}: Omit<newNoteFormTypes, "newNote"> & {
  refreshUserData: () => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<NoteInput>({
    resolver: zodResolver(noteInputSchema),
  });

  useEffect(() => {
    setFocus("title");
  }, []);

  const handleFormSubmit = async (data: NoteInput) => {
    if (pet) {
      addNote(userId, pet.id, { ...data, id: uuidv4() });
      await refreshUserData();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label htmlFor="title">Note Title</label>
        <input type="text" id="title" {...register("title")} />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" {...register("content")} />
        {errors.content && <p className="error">{errors.content.message}</p>}
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
}
