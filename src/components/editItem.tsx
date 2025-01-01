import React from "react";

export default function EditItem() {
  return (
    <>
      <div className="relative w-[300px]">
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" />
          </div>
          <div>
            <label htmlFor="doctor">Doctor</label>
            <input type="text" id="doctor" />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" />
          </div>
          <div>
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
