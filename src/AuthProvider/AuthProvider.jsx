/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(() => {
    // ✅ Load cached role on first render
    const cachedRole = localStorage.getItem("role");
    return cachedRole ? JSON.parse(cachedRole) : null;
  });
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signuprg = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("role"); // ✅ clear cache on logout
    return signOut(auth);
  };

  // ✅ Fetch user role when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        try {
          const res = await axios.get(
            `https://freshcutserverside.vercel.app/users/${currentUser.email}`
          );

          const newRole = res.data?.role || "user";

          // ✅ Update only if role changed
          if (newRole !== role) {
            setRole(newRole);
            localStorage.setItem("role", JSON.stringify(newRole));
          }
        } catch (error) {
          console.error("Failed to fetch user role", error);
          setRole("user");
          localStorage.setItem("role", JSON.stringify("user"));
        }
      } else {
        setRole(null);
        localStorage.removeItem("role");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [role]);

  const authinfo = {
    user,
    role,
    createUser,
    logOut,
    signuprg,
    googleSignin,
    loading,
  };

  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
