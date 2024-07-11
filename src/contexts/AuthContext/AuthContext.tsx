import React, { useEffect, useState } from "react";
import { IAuthState, IAuthContext } from "./types";
import tauriServices from "../../services/tauriServices";
import { LocalStorage } from "../../libs/localStorage";

const AuthState: IAuthState = {
  status: "LOGGED_OUT",
  data: {
    name: "",
    img: "",
    school_id: 0,
  },
};

const AuthContext = React.createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(AuthState);

  const login = (token: string) => {
    LocalStorage.set_token(token);

    refresh();
  };

  const logout = () => {
    setState(() => AuthState);
  };

  const refresh = () => {
    const token = LocalStorage.token();

    tauriServices.auth
      .authUser(token)
      .then(data => setState({ status: "LOGGED_IN", data }))
  };

  useEffect(() => refresh(), []);

  return (
    <>
      <AuthContext.Provider value={{ ...state, login, logout, refresh }}>{children}</AuthContext.Provider>
    </>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
