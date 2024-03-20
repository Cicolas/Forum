import { O } from "ts-toolbelt";
import IUser from "../utils/interfaces/user";
import { Role } from "../utils/types/roles";
import { Permission } from "../utils/types/permissions";
import { api } from "../lib/axios";
import { handleApiAxiosError } from "../utils/errorHandledRequest";
import { TimestampedResponse } from "../utils/types/timestampedResponse";

type CurrentUserResponse = O.Merge<IUser, {roles: Role[], permissions: Permission[]}>;

/* eslint-disable @typescript-eslint/no-unused-vars */
const UserService = {
  getUser: async (name?: string): Promise<IUser[]> => {
    try {
      const response = await api.get<TimestampedResponse<IUser>[]>("/users", {
        params: {
          name,
        }
      });

      const users = response.data.map(user => ({
        ...user,
        createdAt: new Date(user.createdAt * 1000),
      }));

      return users;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao buscar usuario");
    }
  },

  updateUser: async (user: IUser): Promise<IUser> => {
    throw new Error("Not implemented");
  },

  currentUser: async (): Promise<CurrentUserResponse> => {
    try {
      const response = await api.get<TimestampedResponse<CurrentUserResponse>>("/users/current");

      const user = {
        ...response.data,
        createdAt: new Date(response.data.createdAt * 1000),
      };

      return user;
    } catch (err) {
      throw handleApiAxiosError(err, "Ocorreu um erro ao buscar usuario");
    }
  },
}

export default UserService;