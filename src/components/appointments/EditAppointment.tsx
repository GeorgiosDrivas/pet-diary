import CloseSvg from "@/assets/closeSvg";
import { AppointmentsType, Pet } from "@/types";
import React from "react";
import { editAppointment } from "../../../firebase/editMethods";
import { useForm } from "react-hook-form";
import {
  AppointmentFormType,
  appointmentSchema,
} from "@/schemas/appointmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function EditAppointment({
  pet,
  appointment,
  setEditable,
  userId,
}: {
  pet: Pet;
  appointment: AppointmentsType | null;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormType>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      title: appointment?.title || "",
      doctor: appointment?.doctor || "",
      date: appointment?.date || "",
      time: appointment?.time || "",
      description: appointment?.description || "",
    },
  });

  const handleSubmitForm = (data: AppointmentFormType) => {
    if (appointment) {
      editAppointment(userId, pet.name, appointment.id, {
        id: appointment.id,
        title: data.title,
        doctor: data.doctor,
        date: data.date,
        time: data.time ?? "",
        start: data.date,
        end: data.date,
        description: data.description,
      });
      setEditable(false);
    }
  };

  return (
    <>
      <div className="relative w-[300px]">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="doctor">Doctor</label>
            <input type="text" id="doctor" {...register("doctor")} />
            {errors.doctor && (
              <p className="text-red-500 text-sm">{errors.doctor.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" {...register("date")} />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="time" id="time" {...register("time")} />
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" {...register("description")} />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
        <button
          className="hide-form-btn remove-btn"
          onClick={() => setEditable((prv) => !prv)}
        >
          <CloseSvg />
        </button>
      </div>
    </>
  );
}
