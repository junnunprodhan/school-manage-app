import React from "react";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AuthProvider>{children}</AuthProvider>
    </AppProvider>
  );
}
