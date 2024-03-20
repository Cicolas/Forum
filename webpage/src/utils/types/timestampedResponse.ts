import { O } from "ts-toolbelt";

export type TimestampedResponse<T extends object> = O.Replace<T, Date, number>;
