import React, { useEffect, useState } from "react";
import { IAppState, IAppContext } from "./types";
import tauriServices from "../../services/tauriServices";

const AppState: IAppState = {
  version: 1.0,
};

const AppContext = React.createContext({} as IAppContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, _setState] = useState(AppState);

  const init = () => {
    tauriServices.app.init_app();
  };

  useEffect(() => init(), []);

  return (
    <>
      <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
    </>
  );
}

export function useApp() {
  return React.useContext(AppContext);
}
