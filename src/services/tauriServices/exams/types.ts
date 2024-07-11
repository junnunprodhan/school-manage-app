import { Id } from "../types";

export interface IExam {
  id: Id;
  name: string;
  started: string;
  class_id: Id;
  school_id: Id;
}

export interface IExamWithClass {
  id: Id;
  name: string;
  started: string;
  class_id: Id;
  school_id: Id;
  class_name: string;
}
