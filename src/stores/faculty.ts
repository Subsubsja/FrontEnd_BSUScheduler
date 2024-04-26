import { create } from "zustand";
import { IOverallSummary, ITotal } from "@/types/api";
import { DAYS } from "@/constants/initial";

interface States {
  facultyName: string;
  total: ITotal;
  summary: IOverallSummary;
}

interface Actions {
  setFacultyName: (value: string) => void;
  setTotal: (value: ITotal) => void;
  setSummary: (value: IOverallSummary) => void;
  resetAll: () => void;
}

export const initialValues = DAYS.map(() => "");

export const initialTotal: ITotal = {
  officialTime: initialValues,
  teachingHours: initialValues,
  overtimeWithin: initialValues,
  overtimeOutside: initialValues,
};

export const initialSummary: IOverallSummary = {
  designation: "",
  preparations: "",
  hoursPerWeek: "",
  regularLoad: "",
  overload: "",
  academicRank: "",
  consultationHours: "",
};

export const useFacultyStore = create<States & Actions>((set) => ({
  facultyName: "",

  total: initialTotal,
  summary: initialSummary,

  setFacultyName: (value) => set({ facultyName: value }),
  setTotal: (value) => set({ total: value }),
  setSummary: (value) => set({ summary: value }),

  resetAll: () =>
    set({ facultyName: "", total: initialTotal, summary: initialSummary }),
}));
