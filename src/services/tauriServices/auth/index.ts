import { invoke } from "@tauri-apps/api";
import { IAuthResponse, IAuthUserResponse } from "./types";

export * from "./types";

export async function login(userType: string, schoolId: number, email: string, password: string): Promise<IAuthResponse> {
  return await invoke("login", { userType, schoolId, email, password });
}
export async function signup(
  //
  name: string,
  img: string,
  // about
  birth: string,
  gender: string,
  address: string,
  number: string,
  // login
  email: string,
  password: string
): Promise<IAuthResponse> {
  return await invoke("signup", { name, img, birth, gender, address, number, email, password });
}
export async function logout(): Promise<void> {
  return await invoke("logout", {  });
}

export async function authUser(token: string): Promise<IAuthUserResponse> {
  return await invoke("auth_user", { token });
}