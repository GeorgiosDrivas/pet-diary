"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/utils/auth";
import { useEffect } from "react";
import { useAuthContext } from "@/context/authContext";
import { readData } from "../../../firebase/client";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const { user } = useAuthContext();

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
          <div className="col-span-10">Apointments and medication schedule</div>
        </div>
      </div>
    </main>
  );
}
