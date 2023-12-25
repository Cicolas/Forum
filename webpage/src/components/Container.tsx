import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 px-52 py-4">
      { children }
    </div>
  )
}