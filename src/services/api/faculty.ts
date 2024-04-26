/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ISchedule,
  IFaculty,
  ITotal,
  IOverallSummary,
  IScheduleRight,
} from "@/types/api";
import { api } from "../config";
import { initialSummary, initialTotal } from "@/stores/faculty";

export async function getSchedulesByUser(user_id: number) {
  const response = await api.get(`/schedules/user/${user_id}`);
  const schedules = await response.data;
  return schedules;
}

export async function getFormattedShedule(
  user_id: number,
): Promise<ISchedule[]> {
  const response = await api.get(`/schedules/user/formatted/${user_id}`);
  const schedules = await response.data;
  return schedules;
}

export async function getScheduleBySemAndYear(user_id: number, academic_year: number, semester: string): Promise<ISchedule[]> {
  const response = await api.get(`/schedules/user/formatted/${academic_year}/${semester}/${user_id}`);
  const schedules = await response.data;
  return schedules;
}

export async function uploadSchedules(data: ISchedule[], semester='SECOND', year=2024) {
  try {
    const response = await api.post("/schedules/bulk/formatted", {
      semester, year,
      rows: data,
    });
    return await response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
}

export async function getFacultySummary(id: string) {
  const response = await api.get(`/details/schedules/${id}`);
  const data = await response.data;
  return data;
}

export async function getFaculties(): Promise<IFaculty[]> {
  const response = await api.get("/faculties");
  const faculties = response.data;
  return faculties.rows;
}

export async function updateFaculty(id: number, name: string, initials: string) {
  const response = await api.put("/faculties/update", { id, name, initials });
  return response;
}

export async function deleteFaculty(initials: string) {
  const response = await api.delete(`/faculties/remove/${initials}`);
  return response;
}

export async function getFacultyFooter(id: string) {
  const response = await api.get(`/details/footer/${id}`);
  const responseData = await response.data;

  const data = responseData[responseData.length - 1];

  if (!data) {
    return { total: initialTotal, summary: initialSummary };
  }

  const total: ITotal = {
    officialTime: data.official_time,
    teachingHours: data.teaching_hours,
    overtimeWithin: data.overtimeWithin,
    overtimeOutside: data.overtimeOutside,
  };

  const summary: IOverallSummary = {
    designation: data.designation,
    preparations: data.preparations,
    hoursPerWeek: data.hours_per_week,
    regularLoad: data.regular_load,
    overload: data.overload,
    academicRank: data.academic_rank,
    consultationHours: data.consultation_hours,
  };

  return { total, summary };
}

export async function saveFacultyFooter(
  id: string,
  total: ITotal,
  summary: IOverallSummary,
) {
  await api.post("/details/footer", { id, total, summary });
}

export async function saveScheduleState(bulkData: IScheduleRight[]) {
  const response = await api.post("/details/schedule-state/bulk", bulkData);
  return response.data;
}

export async function getScheduleState(initials: string) {
  const response = await api.get(`/details/schedule-state/${initials}`);
  return response.data;
}
