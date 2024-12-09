"use client";

import { table } from "console";
import { addAppointment } from "../../firebase/client";

interface Data {
  showForm: boolean;
  setShowForm: any;
  newAppointment: any;
  setNewAppointment: any;
  user: any;
}

export default function Appointments({
  showForm,
  setShowForm,
  newAppointment,
  setNewAppointment,
  user,
}: Data) {
  return (
    <>
      <div className="appointments h-full px-8 py-5">
        <h2>Appointments</h2>
        <div className="mt-8">
          {showForm ? (
            <div className="relative w-[300px]">
              <form>
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={newAppointment.title}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        title: e.target.value,
                      })
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
                      setNewAppointment({
                        ...newAppointment,
                        doctor: e.target.value,
                      })
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
                      setNewAppointment({
                        ...newAppointment,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    value={newAppointment.notes}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
              <button
                className="hide-form-btn"
                onClick={() => setShowForm((prv: boolean) => !prv)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g id="Menu / Close_MD">
                    <path
                      id="Vector"
                      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </div>
          ) : (
            <>
              {/* {user && user.appointments.length > 0 ? (
                <table className="w-full">
                  <tr>
                    <th>Title</th>
                    <th>Doctor's name</th>
                    <th>Date</th>
                    <th>Notes</th>
                  </tr>
                  <tr>
                    <td className="text-center">
                      {user.appointments.map((item: any) => (
                        <p>{item.title}</p>
                      ))}
                    </td>
                    <td className="text-center">
                      {user.appointments.map((item: any) => (
                        <p>{item.doctor}</p>
                      ))}
                    </td>
                    <td className="text-center">
                      {user.appointments.map((item: any) => (
                        <p>{item.date}</p>
                      ))}
                    </td>
                    <td className="text-center">
                      {user.notes ? (
                        user.appointments.map((item: any) => (
                          <p key={item.id}>{item.title}</p>
                        ))
                      ) : (
                        <p>0 notes</p>
                      )}
                    </td>
                  </tr>
                </table>
              ) : (
                <p>Your appointments will be displayed here</p>
              )} */}
              <button
                className="mt-4"
                onClick={() => setShowForm((prv: boolean) => !prv)}
              >
                Create an appointment
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
