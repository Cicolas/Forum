import { ReactNode } from "react"

type BoxProps = {
  children?: ReactNode;
}

export function Box({ children }: BoxProps) {
  return <div className="w-1/3 2xl:w-1/4 flex flex-col content-center items-end gap-2">
    {children}
  </div>
}