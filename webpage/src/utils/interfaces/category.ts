import { Timestamp } from "../types/timestamp";

export interface ICategory {
  name: string;
  color: string;
  description: string;
  createdAt: Timestamp;
}