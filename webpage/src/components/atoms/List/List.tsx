import { ReactNode } from "react";

type ListProps = {
  className?: string;
  children?: ReactNode;
}

export function List({ className, children }: ListProps) {
  return <div className={`
    flex flex-col self-stretch gap-8
    ${className}
  `}>
    {children}
  </div>
}