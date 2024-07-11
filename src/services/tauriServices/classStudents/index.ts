import { invoke } from "@tauri-apps/api";
import { IStudentClass, IStudentWithClass } from "./types";
import { IStudent } from "../students/types";

export * from "./types";

export async function addStudentToClass(
  roll: number,
  section: string,
  sectionRoll: number,
  year: number,
  studentId: number,
  classId: number
): Promise<number> {
  return await invoke("add_student_to_class", { roll, section, sectionRoll, year, studentId, classId });
}
export async function getClassStudents(classId: number, year:number): Promise<IStudent[]> {
  return await invoke("get_class_students", { classId, year });
}
export async function getAllStudentWithClass(classId: number, year:number): Promise<IStudentWithClass[]> {
  return await invoke("get_all_student_with_class", { classId, year });
}
export async function getStudentClass(studentId: number, year:number): Promise<IStudentClass> {
  return await invoke("get_student_class", { studentId, year });
}
