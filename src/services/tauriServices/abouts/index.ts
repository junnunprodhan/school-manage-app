import { invoke } from "@tauri-apps/api";
import { IAbout } from "./types";

export * from "./types";

export async function createAbout(
  birth: string,
  gender: string,
  address: string,
  number: string,
  email: string,
  password: string
): Promise<number> {
  return await invoke("create_about", { birth, gender, address, number, email, password });
}
export async function getAbout(aboutId: number): Promise<IAbout> {
  return await invoke("get_about", { aboutId });
}
