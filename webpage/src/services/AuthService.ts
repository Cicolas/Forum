import IToken from "../utils/interfaces/token";
import { O } from "ts-toolbelt";
import IUser from "../utils/interfaces/user";

export type UserRegisterRequest = O.Omit<O.Omit<IUser, "id">, "createdAt">;
export type UserLoginResponse = {
  token: string;
  user: O.Omit<IUser, "createAt">;
}

// const user = {
//   id: "123",
//   name: "user",
//   email: "nicolas.mnw@gmail.com",
//   avatarUrl: "https://avatars.githubusercontent.com/u/32042329?v=4",
// };

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