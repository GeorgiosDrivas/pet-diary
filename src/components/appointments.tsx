"use client";

interface Data {
  showForm: boolean;
  setShowForm: any;
  newAppointment: any;
  setNewAppointment: any;
  pet: any;
}

export default function Appointments({
  showForm,
  setShowForm,
  newAppointment,
  setNewAppointment,
  pet,
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
              {pet ? (
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pet.appointments.length > 0 ? (
                      pet.appointments.map((appointment: any, index: any) => (
                        <tr key={index}>
                          <td className="text-center">{appointment.title}</td>
                          <td className="text-center">{appointment.doctor}</td>
                          <td className="text-center">{appointment.date}</td>
                          <td className="text-center">
                            {appointment.notes || "No notes"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No appointments available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <p>Please select a pet to view appointments.</p>
              )}
              <button className="mt-4" onClick={() => setShowForm(true)}>
                Create an Appointment
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
