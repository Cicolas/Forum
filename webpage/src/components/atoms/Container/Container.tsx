import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  alignment?: "flex-col" | "flex-row";
  className?: string;
}

export function Container({ children, alignment, className }: ContainerProps) {
  return (
    <div className={`
      flex ${alignment??"flex-col"}
      gap-4 px-4 flex-grow md:px-0 md:w-2/3
      ${className}
    `}>
      { children }
    </div>
  )
}