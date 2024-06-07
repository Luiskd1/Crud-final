import { create } from 'zustand'
interface StoreState {
    currentPage: number;
    setCurrentPage: (page: number) => void;
  }

const useStorePage = create<StoreState>((set) => ({
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
  }));

  export default useStorePage