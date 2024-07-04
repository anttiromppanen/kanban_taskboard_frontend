import {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IToken } from "../types/types";

// Define the interface for the context value
interface AuthContextType {
  token: IToken | null;
  setTokenFunc: (newToken: IToken) => void;
  removeTokenFunc: () => void;
}

// Provide a default value for the context
export const AuthContext = createContext<AuthContextType>({
  token: null,
  setTokenFunc: () => {},
  removeTokenFunc: () => {},
});

function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<IToken | null>(
    JSON.parse(sessionStorage.getItem("user") as string) as IToken | null,
  );

  const setTokenFunc = (newToken: IToken) => {
    setToken(newToken);
  };

  const removeTokenFunc = () => {
    setToken(null);
    sessionStorage.removeItem("user");
  };

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("user", JSON.stringify(token));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setTokenFunc,
      removeTokenFunc,
    }),
    [token],
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
