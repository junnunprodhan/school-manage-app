import { invoke } from "@tauri-apps/api";
import { ITeacher } from "./types";

export * from "./types";

export async function createTeacher(name: string, img: string, aboutId: number): Promise<number> {
  return await invoke("create_teacher", { name, img, aboutId });
}
export async function getTeacher(teacherId: number): Promise<ITeacher> {
  return await invoke("get_teacher", { teacherId });
}
export async function getTeachers(): Promise<ITeacher[]> {
  return await invoke("get_teachers", {});
}

export async function addTeacher(
  //
  name: string,
  img: string,
  // about
  birth: string,
  gender: string,
  address: string,
  number: string,
  // login
  email: string,
  password: string
): Promise<number> {
  return await invoke("add_teacher", { name, img, birth, gender, address, number, email, password });
}