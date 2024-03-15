import { createContext, useEffect, useState } from "react";
import IUser from "../utils/interfaces/user";
import Cookie from "js-cookie";
import AuthService from "../services/AuthServicce";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../lib/axios";

export interface IAuthContext {
  authenticated: boolean;
  user?: IUser;

  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | undefined>();

  const authenticated = !!user;

  useEffect(() => {
    const token = Cookie.get("token");

    if (!token) return;

    api.defaults.headers["Authorization"] = token;
    setUser({} as IUser)
  }, [])

  async function login() {
    if (Cookie.get("token")) {
      // toast.warn("Usuário já autenticado!");
      throw new Error("Usuario já autenticado!");
    }

    try {
      const response = await AuthService.login("cicolas", "1234");

      Cookie.set("token", response.token, {expires: 30});

      axios.defaults.headers["Authorization"] = response.token;
      setUser({} as IUser)
    } catch (err) {
      toast.error("Erro ao fazer login!");
    }
  }

  async function logout() {
    Cookie.remove("token");

    axios.defaults.headers["Authorization"] = null;
    setUser(undefined)
  }

  return <AuthContext.Provider value={{authenticated, user, login, logout}}>
    { children }
  </AuthContext.Provider>
}