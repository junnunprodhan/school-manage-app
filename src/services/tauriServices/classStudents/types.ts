import { Id } from "../types";

export interface IStudentWithClass {
  id: Id;
  name: string;
  img: string;
  roll: number;
  class_name: string;
  year: number;

  /**
   * @private
   */
  section: string;
  /**
   * @private
   */
  section_roll:number;
}
export interface IStudentClass {
  name: string;
  roll: number;
  section: string; // ClassSection,
  section_roll: number;
  year: number
}