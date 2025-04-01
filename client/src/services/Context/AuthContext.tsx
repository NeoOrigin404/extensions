import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProps {
  role: string;
  setRole: (role: string) => void;
  premium: boolean;
  setPremium: (subscription: boolean) => void;
}

const authContext = createContext<AuthProps>({
  role: "anonymous",
  setRole: () => {},
  premium: false,
  setPremium: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState(localStorage.getItem("role") || "anonymous");
  const [premium, setPremium] = useState(
    localStorage.getItem("subscription") === "true",
  );

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  useEffect(() => {
    localStorage.setItem("subscription", String(premium));
  }, [premium]);

  return (
    <authContext.Provider value={{ role, setRole, premium, setPremium }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("Le auth context doit exister");
  }

  return context;
}
