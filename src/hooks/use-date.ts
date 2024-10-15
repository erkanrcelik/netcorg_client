import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

interface useDateStore {
  date: DateRange;
  setDate: (date: DateRange | undefined) => void;
}

export const useDate = create<useDateStore>((set) => ({
  date: { from: new Date(2023, 0, 20), to: addDays(new Date(2023, 0, 20), 20) },
  setDate: (date) => set({ date }),
}));
