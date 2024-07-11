import { invoke } from "@tauri-apps/api";
import { IStudentAttendence, IStudentAttendenceWithStudent } from "./types";

export * from "./types";

export async function createStudentSttendence(
  present: boolean,
  date: string,
  studentId: number,
  classId: number
): Promise<void> {
  return await invoke("create_student_attendence", { present, date, classId, studentId });
}
export async function takeStudentAttendences(
  attendences: [number, boolean][],
  date: string,
  classId: number
): Promise<void> {
  return await invoke("take_student_attendences", { attendences, date, classId });
}
export async function getClassAttendences(
date: string,
  classId: number
): Promise<IStudentAttendenceWithStudent[]> {
  return await invoke("get_class_attendences", { date, classId });
}
export async function getStudentAttendences(
  month: number,
  year: number,
  studentId: number,
  classId: number
): Promise<IStudentAttendence[]> {
  return await invoke("get_student_attendences", { month, year, studentId, classId });
}

export async function updateStudentSttendence(
  present: boolean,
  date: string,
  studentId: number,
  classId: number
): Promise<boolean> {
  return await invoke("update_student_attendence", { present, date, classId, studentId });
}
export async function updateStudentAttendences(
  attendences: [number, boolean][],
  date: string,
  classId: number
): Promise<void> {
  return await invoke("update_student_attendences", { attendences, date, classId });
}
export async function isClassAttendencesTaken(
date: string,
  classId: number
): Promise<boolean> {
  return await invoke("is_class_attendences_taken", { date, classId });
}