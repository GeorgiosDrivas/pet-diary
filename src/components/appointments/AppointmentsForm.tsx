import React from "react";
import { Pet } from "@/types";
import { addAppointment } from "../../../firebase/addMethods";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppointmentFormType,
  appointmentSchema,
} from "@/schemas/appointmentSchema";
import { v4 as uuidv4 } from "uuid";

export default function AppointmentsForm({
  userId,
  pet,
}: {
  userId: string;
  pet: Pet | null;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting},
  } = useForm<AppointmentFormType>({
    resolver: zodResolver(appointmentSchema),
  });

  const handleNewAppointmentSubmit = async (data: AppointmentFormType) => {
    if (pet) {
      try {
        await addAppointment(userId, pet.id, {
          ...data,
          id: uuidv4(),
          time: data.time ?? "",
          start: data.date,
          end: data.date,
        });
        reset();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleNewAppointmentSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" {...register("title")} />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="doctor">Doctor</label>
          <input type="text" id="doctor" {...register("doctor")} />
          {errors.doctor && <p className="error">{errors.doctor.message}</p>}
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" {...register("date")} />
          {errors.date && <p className="error">{errors.date.message}</p>}
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input type="time" id="time" {...register("time")} />
          {errors.time && <p className="error">{errors.time.message}</p>}
        </div>
        <div>
          <label htmlFor="notes">Description</label>
          <textarea id="notes" {...register("description")} />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
        </div>
        <button disabled={isSubmitting} type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
}
