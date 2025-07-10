import { AppointmentsType } from "@/types";
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
import { useAppContext } from "@/context/appContext";

export default function AppointmentsTable({
  userId,
  appointments,
  setAppointments,
}: {
  userId: string;
  appointments: AppointmentsType[];
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentsType[]>>;
}) {
  const { refreshUserData, user, currentPet } = useAppContext();
  const [editItem, setEditItem] = useState(false);
  const [editableAppointment, setEditableAppointment] =
    useState<AppointmentsType | null>(null);

  const calendarEvents = appointments.map((appointment) => ({
    ...appointment,
    calendarId: appointment.id ?? undefined,
    start: appointment.start ?? "",
    end: appointment.end ?? "",
  }));

  const removeAppointmentFn = async (appointmentId: string) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== appointmentId)
    );
    if (currentPet) {
      try {
        await removeAppointment(userId, currentPet?.name, appointmentId);
        await refreshUserData(user);
      } catch (err) {
        console.error("Error removing appointment:", err);
        setAppointments((prev) => [
          ...prev,
          currentPet.appointments.find((a) => a.id === appointmentId)!,
        ]);
      }
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
          appointment={editableAppointment}
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
