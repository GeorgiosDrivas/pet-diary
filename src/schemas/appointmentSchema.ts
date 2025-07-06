import { z } from "zod";

export const appointmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  doctor: z.string().min(1, "Doctor is required"),
  date: z.string().min(1, "Date is required"),
  start: z.string().optional(),
  end: z.string().optional(),
  time: z.string().min(1, "Time is required").nullable().optional(),
  description: z.string().min(1, "Description is required").optional(),
});
export type AppointmentFormType = z.infer<typeof appointmentSchema>;
