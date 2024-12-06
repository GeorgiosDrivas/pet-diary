"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/utils/auth";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import { addAppointment, readData, writeUsers } from "../../../firebase/client";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    doctor: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
    if ((!loading && !isAuthenticated) || !user) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddAppointment = (e: any) => {
    e.preventDefault();
    addAppointment(1, newAppointment);
    setNewAppointment({
      title: "",
      doctor: "",
      date: "",
      notes: "",
    });
  };

  readData(1);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="w-full h-screen">
        <div className="grid grid-cols-12 gap-4 h-full">
          <div className="col-span-2">
            <div
              id="sidebar"
              className="bg-[#ffffff] h-full grid grid-rows-12 ps-5"
            >
              <div className="row-span-11">
                <h1>Pet Diary</h1>
              </div>
              <div className="row-span-1">
                <p>{user.displayName}</p>
              </div>
            </div>
          </div>
          <div className="col-span-10 pe-4">
            <div className="grid grid-rows-12 gap-4 h-full py-3">
              <div className="row-span-6">
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
                          <button onClick={(e) => handleAddAppointment(e)}>
                            Create appointment
                          </button>
                        </form>
                        <button
                          className="hide-form-btn"
                          onClick={() => setShowForm((prv) => !prv)}
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
                        <p>Your appointments will be displayed here</p>
                        <button
                          className="mt-4"
                          onClick={() => setShowForm((prv) => !prv)}
                        >
                          Create an appointment
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="row-span-6">
                <div className="medication h-full px-8 py-5">
                  <h2>Appointments</h2>
                  <div className="flex flex-col justify-center items-center mt-8">
                    <p>Your medication will be displayed here</p>
                    <button className="mt-4">Create a medication</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
