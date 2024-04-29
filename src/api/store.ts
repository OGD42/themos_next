import { User } from "firebase/auth";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  user: User | undefined;
  setUser: (user: User) => void;
}

const store = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (by) => set(() => ({ user: by })),
      }),
      {
        name: "themos-storage",
      },
    ),
  ),
);

export default store;
