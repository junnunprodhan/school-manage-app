import { IClassSection } from "./types";

export * from "./types";

export async function getClassSections(): Promise<IClassSection[]> {
  return [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
  ];
}
