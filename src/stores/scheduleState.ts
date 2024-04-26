import { IScheduleRight } from "@/types/api";
import { create } from "zustand";

interface States {
  scheduleState: IScheduleRight[];
}

interface Actions {
  setStateSchedule: (scheduleState: IScheduleRight[]) => void;
}

const initialData: IScheduleRight[] = [];
export const useScheduleState = create<States & Actions>((set) => ({
  scheduleState: initialData,
  setStateSchedule: (scheduleState) => set({ scheduleState }),
}));
