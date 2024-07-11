import { invoke } from "@tauri-apps/api";
import { IClass } from "../classes/types";

// export * from "./types";

export async function addClassToSchool(classId: number): Promise<number> {
  return await invoke("add_class_to_school", { classId });
}
export async function getSchoolClasses(): Promise<IClass[]> {
  return await invoke("get_school_classes", {});
}
export async function getSchoolClassesCount(): Promise<number> {
  return await invoke("get_school_classes_count", {});
}
