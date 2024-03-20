import IToken from "../utils/interfaces/token";
import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";

// ONLY FOR TESTS PURPOSES
const CREATE_MEMBER_ROUTE = "/members";

export type UserRegisterRequest = {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const AuthService = {
  login: async (email: string, password: string): Promise<IToken> => {
    try {
      const response = await api.post("/login", {email, password});

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar logar-se");
    }
  },

  register: async (user: UserRegisterRequest) => {
    try {
      const response = await api.post<undefined>(CREATE_MEMBER_ROUTE, user);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao tentar registrar-se");
    }
  },
}

export default AuthService;