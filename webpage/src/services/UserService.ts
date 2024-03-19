import IToken from "../utils/interfaces/token";
import { O } from "ts-toolbelt";
import IUser from "../utils/interfaces/user";
import { Role } from "../utils/types/roles";
import { Permission } from "../utils/types/permissions";

type CurrentUserResponse = O.Merge<IUser, {roles: Role[], permissions: Permission[]}>;

const user = {
  id: "123",
  name: "user",
  email: "nicolas.mnw@gmail.com",
  avatarUrl: "https://avatars.githubusercontent.com/u/32042329?v=4",
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const UserService = {
  getUser: async (name?: string): Promise<IUser[]> => {
    return new Promise((resolve) => {
      resolve([user].filter(value => value.name === name) as IUser[]);
    });
  },

  updateUser: async (user: IUser): Promise<IUser> => {
    return new Promise((resolve) => {
      resolve(user);
    });
  },

  currentUser: async (): Promise<CurrentUserResponse> => {
    return new Promise((resolve) => {
      resolve({
        ...user,
        roles: ["admin", "member"],
        permissions: [
          "list-permissions",
          "create-permission",
          "delete-permission",
          "list-roles",
          "create-role",
          "delete-role",
          "update-user",
          "delete-user",
          "create-admin",
          "create-category",
          "update-category",
          "delete-category",
          "create-contribution",
          "update-contribution",
          "delete-contribution",
          "rank-contribution",
        ],
      } as CurrentUserResponse);
    });
  },
}

export default UserService;