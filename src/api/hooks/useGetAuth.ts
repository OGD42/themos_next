"use client";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/api/firebase";
import useStore from "@/api/store";

const useGetAuth = () => {
  const [state, setState] = useState<{
    user: null | User;
    isLoading: boolean;
    error: boolean;
  }>({
    user: null,
    isLoading: true,
    error: false,
  });
  const userStore = useStore();
  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setState({
          ...state,
          user,
          isLoading: false,
          error: false,
        });
        userStore.setUser(user);
      } else {
        setState({
          ...state,
          user,
          isLoading: false,
          error: false,
        });
        userStore.setUser(undefined);
      }
    });

    () => {
      subscription();
    };
  }, []);
  return { ...state };
};

export default useGetAuth;
