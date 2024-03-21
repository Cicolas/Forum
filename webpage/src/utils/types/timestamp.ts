export type Timestamp = number;

export function timestampToDate(timestamp: Timestamp): Date {
  return new Date(timestamp * 1000);
}