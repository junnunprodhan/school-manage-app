import { Id } from "../types";

export interface IExamSubject {
  id: Id;
  objective_mark: number;
  subjective_mark: number;
  practical_mark: number;
  subject_id: Id;
  exam_id: Id;
}
export interface IExamSubjectWithSubject {
  id: Id;
  objective_mark: number;
  subjective_mark: number;
  practical_mark: number;
  subject_id: Id;
  exam_id: Id;
  subject_name: string;
  subject_code: string;
}
