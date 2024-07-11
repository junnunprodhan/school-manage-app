import { Id } from "../types";

export interface IParent {
  id: Id;
  name: string;
  img?: string;
  profession?: string;
  about_id: Id;
}