import { O } from "ts-toolbelt";
import IUser from "../utils/interfaces/user";
import { Role } from "../utils/types/roles";
import { Permission } from "../utils/types/permissions";
import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";

type CurrentUserResponse = O.Merge<IUser, {roles: Role[], permissions: Permission[]}>;

const UserService = {
  getUser: async (name?: string): Promise<IUser[]> => {
    try {
      const response = await api.get<IUser[]>("/users", {
        params: {
          name,
        }
      });

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao buscar usuario");
    }
  },

  updateUser: async (user: IUser): Promise<IUser> => {
    try {
      const response = await api.put<IUser>(`/users/${user.id}`, user);

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao atualizar usuario");
    }
  },

  currentUser: async (): Promise<CurrentUserResponse> => {
    try {
      const response = await api.get<CurrentUserResponse>("/users/current");

      return response.data;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao buscar usuario");
    }
  },
}

export default UserService;