import { invoke } from "@tauri-apps/api";

export * from "./types";

export async function init_app(): Promise<number> {
  return await invoke("init_app", {});
}
