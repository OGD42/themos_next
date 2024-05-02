import { User } from "firebase/auth";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  user: User | undefined;
  setUser: (user: User) => void;
  activeThreadId: string | undefined;
  setThreadId: (id: string) => void;
}

const store = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (by) => set(() => ({ user: by })),
        activeThreadId: undefined,
        setThreadId: (id) => set(() => ({ activeThreadId: id })),
      }),
      {
        name: "themos-storage",
      }
    )
  )
);

export default store;
