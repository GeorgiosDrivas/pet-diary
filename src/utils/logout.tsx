import React, { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/client";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(`/`);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <button className="logout mt-5" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
