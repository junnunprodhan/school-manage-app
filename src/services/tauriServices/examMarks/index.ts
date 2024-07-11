import { invoke } from "@tauri-apps/api";
import { IExamMarkWithSubject, IExamMarkWithStudentAndSubject } from "./types";
export * from "./types";

export async function createExamMark(
  objectiveMark: number,
  subjectiveMark: number,
  practicalMark: number,
  subjectId: number,
  studentId: number,
  examId: number
): Promise<number> {
  return await invoke("create_exam_mark", {
    objectiveMark,
    subjectiveMark,
    practicalMark,
    studentId,
    subjectId,
    examId,
  });
}
export async function getExamMark(
  examMarkId: number
): Promise<IExamMarkWithSubject> {
  return await invoke("get_exam_mark", { examMarkId });
}
export async function getStudentExamMarks(
  studentId: number,
  examId: number
): Promise<IExamMarkWithSubject[]> {
  return await invoke("get_student_exam_marks", { studentId, examId });
}

export async function getClassSubjectExamMarks(
  subjectId: number,
  examId: number
): Promise<IExamMarkWithStudentAndSubject[]> {
  return await invoke("get_class_subject_exam_marks", { subjectId, examId });
}

/**
 *
 * @param marks (objective_mark, subjective_mark, practical_mark, student_id)[]
 * @param subjectId
 * @param examId
 * @returns
 */
export async function addClassSubjectExamMarks(
  marks: Array<[number, number, number, number]>,
  subjectId: number,
  examId: number
): Promise<number> {
  return await invoke("add_class_subject_exam_marks", {
    marks,
    subjectId,
    examId,
  });
}

export async function updateExamMark(
  objectiveMark: number,
  subjectiveMark: number,
  practicalMark: number,
  subjectId: number,
  studentId: number,
  examId: number
): Promise<boolean> {
  return await invoke("update_exam_mark", {
    objectiveMark,
    subjectiveMark,
    practicalMark,
    studentId,
    subjectId,
    examId,
  });
}
/**
 *
 * @param marks (objective_mark, subjective_mark, practical_mark, student_id)[]
 * @param subjectId
 * @param examId
 * @returns
 */
export async function updateClassSubjectExamMarks(
  marks: Array<[number, number, number, number]>,
  subjectId: number,
  examId: number
): Promise<number> {
  return await invoke("update_class_subject_exam_marks", {
    marks,
    subjectId,
    examId,
  });
}
export async function isClassSubjectExamMarksAdded(
  classId: number,
  subjectId: number,
  examId: number
): Promise<boolean> {
  return await invoke("is_class_subject_exam_marks_added", {
    classId,
    subjectId,
    examId,
  });
}
