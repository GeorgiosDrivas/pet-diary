import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/client";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    // Try to sign in anonymously only if no user is currently signed in
    if (!auth.currentUser) {
      signInAnonymously(auth).catch((error) => {
        console.error("Anonymous sign-in failed", error);
        setLoading(false);
      });
    }

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
