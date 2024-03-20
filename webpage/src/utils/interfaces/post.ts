import { Timestamp } from "../types/timestamp";
import { ICategory } from "./category";
import IUser from "./user";

export interface IPost {
  id: string;
  author: IUser;
  title: string;
  content: string;
  categories: ICategory[];
  upVotes: string[];
  downVotes: string[];
  createdAt: Timestamp;
  lastUpdate: Timestamp;
}