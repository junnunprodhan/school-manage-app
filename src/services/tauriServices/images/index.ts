import { createDir, writeFile, readTextFile, BaseDirectory } from "@tauri-apps/api/fs";

export * from "./types";

/**
 * 
 * @param filename 
 * @param contents base64 string
 * @returns filename
 */
export async function uploadImage(filename: string, contents: string): Promise<string> {
  const generatedName = generateName(filename);

  await createDir('images', { dir: BaseDirectory.AppData, recursive: true });

  await writeFile(`images/${generatedName}`, contents, { dir: BaseDirectory.AppData });

  return generatedName;
}

/**
 * 
 * @param filename 
 * @returns base64 string
 */
export async function loadImage(filename: string): Promise<string> {
  return await readTextFile(`images/${filename}`, {dir: BaseDirectory.AppData});
}

function generateName(filename: string): string {
  const prefix = Math.floor(Math.random() * 10000);
  
  return `${prefix}${filename}`;
}