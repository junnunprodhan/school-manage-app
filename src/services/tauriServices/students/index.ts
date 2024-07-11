import { invoke } from "@tauri-apps/api";
import { IStudent } from "./types";

export * from "./types";

export async function createStudent(name: string, img: string, about_id: number): Promise<number> {
  return await invoke("create_student", { name, img, about_id });
}
export async function getStudent(studentId: number): Promise<IStudent> {
  return await invoke("get_student", { studentId });
}
export async function getStudents(): Promise<IStudent[]> {
  return await invoke("get_students", {});
}

export async function addStudent(
  //
  name: string,
  img: string,
  // class
  classRoll: number,
  classId: number,
  section: string,
  sectionRoll: number,
  year: number,
  // about
  birth: string,
  gender: string,
  address: string,
  number: string,
  // login
  email: string,
  password: string
): Promise<number> {
  return await invoke("add_student", {
    name,
    img,
    classRoll,
    classId,
    section,
    sectionRoll,
    year,
    birth,
    gender,
    address,
    number,
    email,
    password,
  });
}