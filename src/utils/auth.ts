import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/client";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // `true` if a user is logged in
      setLoading(false); // Authentication state is determined
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
