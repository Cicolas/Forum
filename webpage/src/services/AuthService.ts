import IToken from "../utils/interfaces/token";
import { O } from "ts-toolbelt";
import IUser from "../utils/interfaces/user";

export type UserRegisterRequest = O.Omit<O.Omit<IUser, "id">, "createdAt">;

/* eslint-disable @typescript-eslint/no-unused-vars */
const AuthService = {
  login: async (username: string, password: string): Promise<IToken> => {
    return new Promise((resolve) => {
      resolve({token: "1234"} as IToken)
    });
  },

  register: async (user: UserRegisterRequest): Promise<IToken> => {
    return new Promise((resolve) => {
      resolve({token: "1234"} as IToken)
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      resolve(true)
    });
  },
}

export default AuthService;