import { invoke } from "@tauri-apps/api";
import { IParent } from "./types";

export * from "./types";


export async function createParent(name: string, img: string, profession: string, aboutId: number): Promise<number> {
  return await invoke("create_parent", { name, img, profession, aboutId });
}
export async function getParent(parentId: number): Promise<IParent> {
  return await invoke("get_parent", { parentId });
}
export async function getParents(): Promise<IParent[]> {
  return await invoke("get_parents", {});
}

export async function addParent(
  name: string,
  img: string,
  profession: string,
  // about
  birth: string,
  gender: string,
  address: string,
  number: string,
  // login
  email: string,
  password: string,
  // student
  studentId: number
): Promise<number> {
  return await invoke("add_parent", { name, img, profession, birth, gender, address, number, email, password, studentId });
}
