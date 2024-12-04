"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/utils/auth";
import { useEffect } from "react";
import { useAuthContext } from "@/context/authContext";

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

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="w-full">
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          <div className="row-span-3">Sidebar</div>
          <div className="col-span-2 row-span-2">
            Apointments and medication schedule
          </div>
        </div>
      </div>
    </main>
  );
}
