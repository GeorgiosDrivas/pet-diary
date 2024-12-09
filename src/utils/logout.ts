import { signOut } from "firebase/auth";
import { auth } from "../../firebase/client";

export default function Logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
