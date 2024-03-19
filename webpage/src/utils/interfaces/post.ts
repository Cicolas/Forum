import { IRank } from "./rank";

export interface IPost {
  id: string;
  author: string;
  title: string;
  content: string;
  categories: string[];
  rank: IRank;
  createdAt: Date;
  lastUpdate: Date;
}