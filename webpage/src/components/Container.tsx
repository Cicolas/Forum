import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 px-4 md:px-0 md:w-2/3 py-4">
      { children }
    </div>
  )
}