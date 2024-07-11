import { Id } from "../types";

export interface IStudentAttendence {
  id: number;
  present: boolean;
  day: number;
  month: number;
  year: number;
  class_id: Id;
  student_id: Id;
}
export interface IStudentAttendenceWithStudent {
  id: number;
  present: boolean;
  name: string;
  img: string;
}