import { create } from "zustand";
import { ModalType } from "@/components/modal/custom-modal";
import { IFaculty } from "@/types/api";

interface ModalStates {
  faculty: IFaculty | null;
  action: ModalType;
  isOpen: boolean;
}

interface ModalActions {
  openModal: (faculty: IFaculty, action: ModalType) => void;
  closeModal: () => void;
}

const useFacultyModalStore = create<ModalStates & ModalActions>((set) => ({
  faculty: null,
  action: null,
  isOpen: false,
  openModal: (faculty, action) => set({ isOpen: true, faculty, action }),
  closeModal: () => set({ isOpen: false, faculty: null, action: null }),
}));

export default useFacultyModalStore;
