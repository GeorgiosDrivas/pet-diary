import React from "react";
import { AppointmentsType, Pet } from "@/types";
import { handleNewItem } from "@/utils/newItem";
import { stateChange } from "@/utils/stateChange";
import { addAppointment } from "../../../firebase/addMethods";

export default function AppointmentsForm({
  newAppointment,
  setNewAppointment,
  pet,
}: {
  newAppointment: AppointmentsType;
  setNewAppointment: React.Dispatch<React.SetStateAction<AppointmentsType>>;
  pet: Pet | null;
}) {
  return (
    <>
      <form
        onSubmit={() => {
          handleNewItem(pet, addAppointment, newAppointment);
        }}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={newAppointment.title}
            onChange={(e) =>
              stateChange(e, "title", setNewAppointment, newAppointment)
            }
          />
        </div>
        <div>
          <label htmlFor="doctor">Doctor</label>
          <input
            type="text"
            id="doctor"
            value={newAppointment.doctor}
            onChange={(e) =>
              stateChange(e, "doctor", setNewAppointment, newAppointment)
            }
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={newAppointment.date}
            onChange={(e) =>
              stateChange(e, "date", setNewAppointment, newAppointment)
            }
          />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={newAppointment.notes}
            onChange={(e) =>
              stateChange(e, "notes", setNewAppointment, newAppointment)
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
