import { IScheduleData, ISchedule } from "@/types/api";

export const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const SCHEDULES = [
  // "06:00 - 06:30",
  // "06:30 - 07:00",
  "07:00 - 07:30",
  "07:30 - 08:00",
  "08:00 - 08:30",
  "08:30 - 09:00",
  "09:00 - 09:30",
  "09:30 - 10:00",
  "10:00 - 10:30",
  "10:30 - 11:00",
  "11:00 - 11:30",
  "11:30 - 12:00",
  "12:00 - 12:30",
  "12:30 - 01:00",
  "01:00 - 01:30",
  "01:30 - 02:00",
  "02:00 - 02:30",
  "02:30 - 03:00",
  "03:00 - 03:30",
  "03:30 - 04:00",
  "04:00 - 04:30",
  "04:30 - 05:00",
  "05:00 - 05:30",
  "05:30 - 06:00",
  "06:00 - 06:30",
  "06:30 - 07:00",
  "07:00 - 07:30",
  "07:30 - 08:00",
];

export const initialTableData = {
  title: "faculty schedule",
  college: "college of engineering, architecture and fine arts",
  campus: "pablo borbon main II",
  semester: "second",
  academicYear: "2023-2024",
};

export function createSchedulePerTime() {
  const array: ISchedule[] = [];

  for (const time of SCHEDULES) {
    const daySchedules: IScheduleData[] = [];

    for (const day of DAYS) {
      const newSchedule: IScheduleData = {
        day,
        course: "",
        section: "",
        room: "",
        initials: "",
        conflicted: false
      };

      daySchedules.push(newSchedule);
    }

    array.push({ time, schedules: daySchedules });
  }

  return array;
}
