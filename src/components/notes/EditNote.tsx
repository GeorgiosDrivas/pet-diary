import { editNoteTypes } from "@/types";
import React, { useEffect } from "react";
import { editNote } from "../../../firebase/editMethods";
import { NoteInput, noteInputSchema } from "@/schemas/notesSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/context/appContext";

export default function EditNote({ userId, Note, setEditable }: editNoteTypes) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<NoteInput>({
    defaultValues: {
      title: Note?.title,
      content: Note?.content,
    },
    resolver: zodResolver(noteInputSchema),
  });
  const { refreshUserData, user, currentPet } = useAppContext();

  useEffect(() => {
    setFocus("title");
  }, []);

  const onSubmit = async (data: NoteInput) => {
    if (Note) {
      await editNote(userId, currentPet?.id, Note.id, { ...data, id: Note.id });
      await refreshUserData(user);
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
