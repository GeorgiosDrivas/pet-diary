import { AppointmentsType, Pet } from "@/types";
import React from "react";
import EventModal from "@/components/EventModal";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import EditAppointment from "./EditAppointment";
import { removeAppointment } from "../../../firebase/deleteMethods";
import { useState } from "react";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";

export default function AppointmentsTable({
  pet,
  userId,
  appointments,
  setAppointments,
}: {
  pet: Pet;
  userId: string;
  appointments: AppointmentsType[];
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentsType[]>>;
}) {
  const [editItem, setEditItem] = useState(false);
  const [editableAppointment, setEditableAppointment] =
    useState<AppointmentsType | null>(null);

  const calendarEvents = appointments.map((appointment) => ({
    ...appointment,
    calendarId: appointment.id ?? undefined,
  }));

  const removeAppointmentFn = async (appointmentId: string) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== appointmentId)
    );

    try {
      await removeAppointment(userId, pet?.name, appointmentId);
    } catch (err) {
      console.error("Error removing appointment:", err);
      setAppointments((prev) => [
        ...prev,
        pet.appointments.find((a) => a.id === appointmentId)!,
      ]);
    }
  };

  const editAppointment = (appointment: AppointmentsType) => {
    setEditItem(true);
    setEditableAppointment(appointment);
  };

  const calendar = useCalendarApp({
    views: [createViewMonthGrid(), createViewMonthAgenda()],
    events: calendarEvents,
    plugins: [createEventModalPlugin()],
  });

  return (
    <>
      {editItem ? (
        <EditAppointment
          pet={pet}
          appointment={editableAppointment}
          setAppointment={setEditableAppointment}
          setEditable={setEditItem}
          userId={userId}
        />
      ) : (
        <ScheduleXCalendar
          calendarApp={calendar}
          customComponents={{
            eventModal: (props: { calendarEvent: AppointmentsType }) => {
              return (
                <EventModal
                  calendarEvent={props.calendarEvent}
                  edit={editAppointment}
                  deleteFn={removeAppointmentFn}
                />
              );
            },
          }}
        />
      )}
    </>
  );
}
