export default function Medication({
  pet,
  showForm,
}: {
  pet: any;
  showForm: boolean;
}) {
  return (
    <>
      <div className="medication h-full px-8 py-5">
        <h2>Appointments</h2>
        <div className="mt-8">
          {showForm ? (
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
              </form>
              <button className="hide-form-btn">
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
                      <th>Name</th>
                      <th>Dosage</th>
                      <th>Date</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pet.medications.length > 0 ? (
                      pet.medications.map((medication: any, index: any) => (
                        <tr key={index}>
                          <td className="text-center">
                            {medication.medicationName}
                          </td>
                          <td className="text-center">{medication.dosage}</td>
                          <td className="text-center">{medication.date}</td>
                          <td className="text-center">
                            {medication.notes || "No notes"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No medications available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <p>Please select a pet to view medications.</p>
              )}
              <button className="mt-4">Create an medication</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
