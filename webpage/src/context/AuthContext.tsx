import { createContext, useEffect, useState } from "react";
import IUser from "../utils/interfaces/user";
import Cookie from "js-cookie";
import AuthService, { UserRegisterRequest } from "../services/AuthService";
import { toast } from "react-toastify";
import { api } from "../lib/axios";
import UserService from "../services/UserService";
import { Permission } from "../utils/types/permissions";
import { Role } from "../utils/types/roles";

export interface IAuthContext {
  authenticated: boolean;
  user?: IUser;
  roles?: Role[];
  permissions?: Permission[];

  login: (email: string, password: string) => Promise<void>;
  register: (user: UserRegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | undefined>();
  const [roles, setRoles] = useState<Role[]>();
  const [permissions, setPermissions] = useState<Permission[]>();

  const authenticated = !!user;

  useEffect(() => {
    const token = Cookie.get("token");

    if (!token || user) return;

    api.defaults.headers["Authorization"] = "Bearer " + token;

    const fetchCurrentUserWrapper = async () => {
      await fetchCurrentUser();
    }

    fetchCurrentUserWrapper();
  })

  async function login(email: string, password: string) {
    if (Cookie.get("token")) {
      throw new Error("Usuario já autenticado!");
    }

    const response = await AuthService.login(email, password);

    Cookie.set("token", response.token, {expires: 30});
    api.defaults.headers["Authorization"] = "Bearer " + response.token;

    await fetchCurrentUser();
  }

  async function register(user: UserRegisterRequest) {
    const response = await AuthService.register(user);
    console.log(response);
  }

  async function logout() {
    Cookie.remove("token");

    api.defaults.headers["Authorization"] = null;
    setUser(undefined)
    setRoles(undefined);
    setPermissions(undefined);
  }

  async function fetchCurrentUser() {
    try {
      const response = await UserService.currentUser();
      setUser(response as IUser);
      setRoles(response.roles);
      setPermissions(response.permissions);
    } catch (err) {
      logout();
      toast.error("Erro ao buscar usuário!");
    }
  }

  return <AuthContext.Provider value={{authenticated, user, roles, permissions, login, register, logout}}>
    { children }
  </AuthContext.Provider>
}