import { invoke } from "@tauri-apps/api";
import { IExamSubjectWithSubject } from "./types";

export * from "./types";

export async function createExamSubject(
  objectiveMark: number,
  subjectiveMark: number,
  practicalMark: number,
  subjectId: number,
  examId: number
): Promise<number> {
  return await invoke("create_exam_subject", { objectiveMark, subjectiveMark, practicalMark, subjectId, examId });
}
export async function getExamSubject(examSubjectId: number): Promise<IExamSubjectWithSubject> {
  return await invoke("get_exam_subject", { examSubjectId });
}
export async function getExamSubjects(examId: number): Promise<IExamSubjectWithSubject[]> {
  return await invoke("get_exam_subjects", { examId });
}

/**
 * 
 * @param subjects (objective_mark, subjective_mark, practical_mark, subject_id)[]
 * @param examId 
 * @returns 
 */
export async function addExamSubjects(
  subjects: Array<[number, number, number,number]>,
  examId: number
): Promise<number> {
  return await invoke("add_exam_subjects", { subjects, examId });
}