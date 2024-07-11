import { invoke } from "@tauri-apps/api";
import { ITeacher } from "../teachers/types";

// export * from "./types";

export async function addTeacherToSchool(teacherId: number): Promise<number> {
  return await invoke("add_teacher_to_school", { teacherId });
}
export async function getSchoolTeachers(): Promise<ITeacher[]> {
  return await invoke("get_school_teachers", {});
}
export async function getSchoolTeachersCount(): Promise<number> {
  return await invoke("get_school_teachers_count", {});
}