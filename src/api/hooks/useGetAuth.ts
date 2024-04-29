"use client";
import { User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase";

const useGetAuth = () => {
  const [user, setUser] = useState<null | User>();
  useEffect(() => {
    const observer = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
    return () => {
      observer();
    };
  }, []);
  return user;
};

export default useGetAuth;
