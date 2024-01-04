import { IRank } from "./rank";

export interface IComment {
  id: string;
  parentId: string;
  author: string;
  content: string;
  rank: IRank;
  createdAt: number;
  lastUpdate: number;
}