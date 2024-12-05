"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/utils/auth";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import { readData } from "../../../firebase/client";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if ((!loading && !isAuthenticated) || !user) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  <div className="flex flex-col justify-center items-center mt-8">
                    {showForm ? (
                      <div className="relative">
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
                          <button>Create appointment</button>
                        </form>
                        <button
                          className="hide-form-btn"
                          onClick={() => setShowForm((prv) => !prv)}
                        >
                          X
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
