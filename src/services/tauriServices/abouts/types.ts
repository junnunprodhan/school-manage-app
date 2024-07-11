import { Id } from "../types";

export interface IAbout {
  id: Id;
  birth: string;
  gender?: string;
  address: string;
  number: string;
  email: string;
  password: string;
}
