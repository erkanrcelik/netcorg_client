import {create} from "zustand";

interface useDateStore {
  date: Date;
  setDate: (date: Date) => void;
}

export const useDate = create<useDateStore>((set) => ({
  date: new Date(),
  setDate: (date) => {
    set({ date });
  },
}));
