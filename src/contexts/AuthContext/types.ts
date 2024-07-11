import { IAuthUserResponse } from "../../services/tauriServices/auth";

export interface IAuthState {
  status: "LOGGED_IN" | "LOGGED_OUT";
  data: IAuthUserResponse;
}

export interface IAuthContext extends IAuthState {
  /**
   * Login
   * 
   */
  login: (token: string) => void;
  /**
   * Logout
   * 
   */
  logout: () => void;
  /**
   * Refresh
   * 
   * Try to load the user.
   */
  refresh: () => void;
}
