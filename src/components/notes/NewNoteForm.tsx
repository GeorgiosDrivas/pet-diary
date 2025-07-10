import React, { useEffect } from "react";
import { newNoteFormTypes } from "@/types";
import { addNote } from "../../../firebase/addMethods";
import { NoteInput, noteInputSchema } from "@/schemas/notesSchemas";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/context/appContext";

export default function NewNoteForm({
  userId,
}: Omit<newNoteFormTypes, "newNote">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<NoteInput>({
    resolver: zodResolver(noteInputSchema),
  });
  const { refreshUserData, user, currentPet } = useAppContext();

  useEffect(() => {
    setFocus("title");
  }, []);

  const handleFormSubmit = async (data: NoteInput) => {
    if (currentPet) {
      await addNote(userId, currentPet.id, { ...data, id: uuidv4() });
      await refreshUserData(user);
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
