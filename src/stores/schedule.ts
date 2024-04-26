import { createSchedulePerTime } from "@/constants/initial";
import { ISchedule } from "@/types/api";
import { create } from "zustand";

interface States {
  schedules: ISchedule[];
}

interface Actions {
  setSchedules: (schedule: ISchedule[]) => void;
  resetSchedules: () => void;
}

const initialData = createSchedulePerTime();

export const useScheduleStore = create<States & Actions>((set) => ({
  schedules: initialData,
  setSchedules: (schedules) => set({ schedules }),
  resetSchedules: () => set({ schedules: initialData }),
}));
