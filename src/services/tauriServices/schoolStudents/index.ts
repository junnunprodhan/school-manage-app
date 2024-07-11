import { invoke } from "@tauri-apps/api";
import { IStudent } from "../students/types";

// export * from "./types";

export async function addStudentToSchool(studentId: number): Promise<number> {
  return await invoke("add_student_to_school", { studentId });
}

export async function getSchoolStudents(): Promise<IStudent[]> {
  return await invoke("get_school_students", {  });
}
export async function getSchoolStudentsCount(): Promise<number> {
  return await invoke("get_school_students_count", {  });
}