import React from "react";
import { AppointmentsType, Pet } from "@/types";
import { handleNewItem } from "@/utils/newItem";
import { stateChange } from "@/utils/stateChange";
import { addAppointment } from "../../../firebase/addMethods";

export default function AppointmentsForm({
  newAppointment,
  setNewAppointment,
  pet,
  userId,
}: {
  newAppointment: AppointmentsType;
  setNewAppointment: React.Dispatch<React.SetStateAction<AppointmentsType>>;
  pet: Pet | null;
  userId: string;
}) {
  const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;

    if (selectedDate) {
      setNewAppointment((prevState) => ({
        ...prevState,
        start: selectedDate,
        end: selectedDate,
      }));
    }
  };

  return (
    <>
      <form
        onSubmit={() => {
          handleNewItem(userId, pet, addAppointment, newAppointment);
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
            value={newAppointment.start}
            onChange={(e) => dateChange(e)}
          />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={newAppointment.time}
            onChange={(e) =>
              stateChange(e, "time", setNewAppointment, newAppointment)
            }
          />
        </div>
        <div>
          <label htmlFor="Notes">Description</label>
          <textarea
            id="Notes"
            value={newAppointment.description}
            onChange={(e) =>
              stateChange(e, "description", setNewAppointment, newAppointment)
            }
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
}
