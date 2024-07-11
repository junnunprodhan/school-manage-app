import { invoke } from "@tauri-apps/api";
import { ISchool } from "./types";

export * from "./types";

export async function getSchool(schoolId: number): Promise<ISchool> {
  return await invoke("get_school", { schoolId });
}
export async function getSchools(): Promise<ISchool[]> {
  return await invoke("get_schools", {});
}
