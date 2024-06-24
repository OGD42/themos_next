"use client";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import useStore from "@/api/store";
import { auth } from "../firebase";

const useGetAuth = () => {
  const [user, setUser] = useState<null | User>();
  const userStore = useStore();
  useEffect(() => {
    const observer = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        return;
      }
      userStore.setUser(undefined);
      setUser(null);
    });
    return () => {
      observer();
    };
  }, []);
  return user;
};

export default useGetAuth;
