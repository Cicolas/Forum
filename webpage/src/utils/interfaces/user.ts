import { Timestamp } from "../types/timestamp";

export default interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: Timestamp;
}