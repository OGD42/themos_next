"use client";
import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import useStore from "@/api/store";
import { createClient } from "../supabase/client";

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
  const client = createClient();
  const userStore = useStore();
  useEffect(() => {
    const { data } = client.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        setState((oldState) => ({
          ...oldState,
          user: session?.user,
          isLoading: false,
        }));
        userStore.setUser(session?.user);
      }
      if (event === "INITIAL_SESSION" && session) {
        setState((oldState) => ({
          ...oldState,
          user: session?.user,
          isLoading: false,
        }));
        userStore.setUser(session?.user);
      }

      if (event === "SIGNED_OUT" && session) {
        setState({
          isLoading: false,
          user: null,
          error: false,
        });
        userStore.setUser(undefined);
      }
    });
    () => {
      data.subscription.unsubscribe();
    };
  }, []);
  return { ...state };
};

export default useGetAuth;
