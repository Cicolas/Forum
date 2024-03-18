import { IRank } from "./rank";

export interface IPost {
  id: string;
  author: string;
  title: string;
  content: string;
  rank: IRank;
  createdAt: Date;
  last_update: Date;
}