import { invoke } from "@tauri-apps/api";
import { IExamWithClass } from "./types";

export * from "./types";

export async function createExam(name: string, started: string, classId: number): Promise<number> {
  return await invoke("create_exam", { name, started, classId });
}
export async function getExam(exam_id: number): Promise<IExamWithClass> {
  return await invoke("get_exam", { exam_id });
}
export async function getSchoolExams(): Promise<IExamWithClass[]> {
  return await invoke("get_school_exams", {});
}
export async function getSchoolExamsCount(): Promise<number> {
  return await invoke("get_school_exams_count", {});
}
export async function getClassExams(classId: number): Promise<IExamWithClass[]> {
  return await invoke("get_class_exams", {classId});
}
