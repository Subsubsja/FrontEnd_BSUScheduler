import { create } from "zustand";

interface States {
  editState: boolean;
}

interface Actions {
  setEditState: (editState: boolean) => void;
  resetEditState: () => void;
}

export const useEditState = create<States & Actions>((set) => ({
  editState: false,
  setEditState: (editState: boolean) => set({ editState }),
  resetEditState: () => set({ editState: false })
}));