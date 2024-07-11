import { invoke } from "@tauri-apps/api";
import { IParent } from "../parents/types";

export * from "./types";

export async function addParentToStudent(parentId: number, studentId: number): Promise<number> {
  return await invoke("add_parent_to_student", { parentId, studentId });
}

export async function getStudentParents(studentId: number): Promise<IParent[]> {
  return await invoke("get_student_parents", { studentId });
}
export async function getStudentParentsOfClass(classId: number): Promise<IParent[]> {
  return await invoke("get_student_parents_of_class", { classId });
}
