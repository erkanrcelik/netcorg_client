import {create} from "zustand";

interface useDateStore {
  date: Date; // Date nesnesi olarak saklıyoruz
  setDate: (date: Date) => void; // Tarih ayarlamak için fonksiyon
}

export const useDate = create<useDateStore>((set) => ({
  date: new Date(), // Başlangıçta bugünün tarihi
  setDate: (date) => {
    set({ date }); // Gelen Date nesnesini doğrudan ayarlıyoruz
  },
}));
