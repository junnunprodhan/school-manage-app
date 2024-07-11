import { invoke } from "@tauri-apps/api";
import { IClass } from "./types";

export * from "./types";

export async function createClass(name: string): Promise<number> {
  return await invoke("create_class", { name });
}
export async function getClass(classId: number): Promise<IClass> {
  return await invoke("get_class", { classId });
}
export async function getClasses(): Promise<IClass[]> {
  return await invoke("get_classes", {});
}

export async function addClass(name: string): Promise<number> {
  return await invoke("add_class", { name });
}