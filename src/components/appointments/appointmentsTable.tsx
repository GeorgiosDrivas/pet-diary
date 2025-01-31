import { AppointmentsType, Pet } from "@/types";
import React, { useState } from "react";
import EditAppointment from "./editAppointment";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { removeAppointment } from "../../../firebase/deleteMethods";
import EventModal from "@/utils/eventModal";

export default function AppointmentsTable({ pet }: { pet: Pet }) {
  const [editItem, setEditItem] = useState(false);
  const [editableAppointment, setEditableAppointment] =
    useState<AppointmentsType | null>(null);
  const calendarEvents = pet.appointments.map((appointment) => ({
    ...appointment,
    calendarId: appointment.calendarId ?? undefined,
  }));

  const removeAppointmentFn = (appointmentId: string) => {
    removeAppointment(1, pet?.name, appointmentId)
      .then(() => {
        pet.appointments = pet.appointments.filter(
          (appointment) => appointment.id !== appointmentId
        );
        alert("Appointment removed successfully.");
      })
      .catch((err) => {
        console.error("Error removing appointment:", err);
      });
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
