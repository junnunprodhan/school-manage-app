import { invoke } from "@tauri-apps/api";
import { IClassSubject } from "./types";

export * from "./types";

export async function createClassSubject(name: string, code: number, classId: number): Promise<number> {
  return await invoke("create_class_subject", { name, code, classId, });
}
export async function getClassSubject(classSubjectId: number): Promise<IClassSubject> {
  return await invoke("get_class_subject", { classSubjectId });
}
export async function getClassSubjects(classId: number): Promise<IClassSubject[]> {
  return await invoke("get_class_subjects", {classId});
}
export async function addClassSubjects(subjects: Array<[string, number]>, classId: number): Promise<number> {
  return await invoke("add_class_subjects", { subjects, classId, });
}