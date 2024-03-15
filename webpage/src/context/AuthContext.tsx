import { createContext } from "react";
import IUser from "../utils/interfaces/user";

export interface IAuthContext {
  authenticated: boolean;
  user?: IUser;
  token?: string;

  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authContextValue: IAuthContext = {
    authenticated: false,
    user: undefined,
    token: undefined,

    login, logout
  };

  async function login() {
    authContextValue.authenticated = true;
    console.log(authContextValue);
    return;
  }

  async function logout() {
    authContextValue.authenticated = false;
    console.log(authContextValue);
    return;
  }

  return <AuthContext.Provider value={authContextValue}>
    { children }
  </AuthContext.Provider>
}