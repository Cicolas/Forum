import IToken from "../utils/interfaces/token";

/* eslint-disable @typescript-eslint/no-unused-vars */
const AuthService = {
  login: async (username: string, password: string): Promise<IToken> => {
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