import { IRank } from "./rank";

export interface IPost {
  id: string;
  author: string;
  title: string;
  content: string;
  rank: IRank;
  created_at: Date;
  last_update: Date;
}