import { ISchedule } from "@/types/api";

export function calculateHoursByDay(schedules: ISchedule[]): number[] {
  const hoursPerDay = [0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < schedules.length; i++) {
    const timeSched = schedules[i].schedules;

    for (let j = 0; j < timeSched.length; j++) {
      const isOccupied = timeSched[j].room ? 1 : 0;
      hoursPerDay[j] += isOccupied / 2;
    }
  }

  return hoursPerDay;
}
