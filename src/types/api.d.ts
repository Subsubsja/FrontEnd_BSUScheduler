export interface IScheduleData {
  day: string;
  course: string;
  room: string;
  section: string;
  initials: string;
  conflicted?: boolean;
}

export interface ISchedule {
  time: string;
  schedules: IScheduleData[];
}

export interface IFaculty {
  id: number;
  name: string;
  initials: string;
}

export interface IAccount {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Data;
}

export interface ITotal {
  officialTime: string[];
  teachingHours: string[];
  overtimeWithin: string[];
  overtimeOutside: string[];
}

export interface IOverallSummary {
  designation: string;
  preparations: string;
  hoursPerWeek: string;
  regularLoad: string;
  overload: string;
  academicRank: string;
  consultationHours: string;
}

export interface IScheduleRight {
  initials: string;
  course: string;
  section: string;
  status?: string;
}

export interface IFormDetails {
  dean: string;
  vcaa: string;
  academic_year: string;
  semester: string;
}