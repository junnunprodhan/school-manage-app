import { Id } from "../types";

export interface IExamMark {
  id: Id;
  objective_mark: number;
  subjective_mark: number;
  practical_mark: number;
  comment: string;
  subject_id: Id;
  student_id: Id;
  exam_id: Id;
}
export interface IExamMarkWithSubject {
  id: Id;
  objective_mark: number;
  subjective_mark: number;
  practical_mark: number;
  comment: string;
  subject_id: Id;
  student_id: Id;
  exam_id: Id;
  subject_name: string;
  subject_code: string;
}
export interface IExamMarkWithStudentAndSubject {
  id: Id;
  objective_mark: number;
  subjective_mark: number;
  practical_mark: number;
  comment: string;
  subject_id: Id;
  student_id: Id;
  exam_id: Id;
  student_name: string;
  student_img: string;
  subject_name: string;
  subject_code: string;
}