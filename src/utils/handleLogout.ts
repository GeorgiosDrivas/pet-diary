import { signOut } from "firebase/auth";
import { auth } from "../../firebase/client";

export const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
