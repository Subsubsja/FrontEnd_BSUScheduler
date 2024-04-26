import { ISchedule } from "@/types/api";
import { api } from "../config";

export async function getSectionList() {
  const response = await api.get(`/details/sections`);
  const data = await response.data;
  return data.schedules;
}

export async function getSectionDetails(section: string, year: number=2024, semester: string='SECOND'): Promise<ISchedule[]> {
  const response = await api.get(`/schedules/section/formatted/${year}/${semester}/${section}`);
  const schedules = await response.data;
  return schedules;
}

export async function updateClassSectionSchedule(schedules: {rows: ISchedule[]}) {
  const response = await api.post(
    `/schedules/bulk/formatted/class-schedule`,
    schedules,
  );

  return response;
}
