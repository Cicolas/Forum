import { Timestamp } from "../types/timestamp";
import IUser from "./user";

export interface IComment {
  id: string;
  parentId: string;
  author: IUser;
  content: string;
  upVotes: string[];
  downVotes: string[];
  createdAt: Timestamp;
  lastUpdate: Timestamp;
  replies: IComment[];
}