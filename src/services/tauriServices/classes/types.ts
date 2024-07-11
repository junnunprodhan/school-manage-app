import { Id } from "../types";

export enum ClassSection {
  A,
  B,
  C,
}

export interface IClass {
  id: Id;
  name: string;
}
