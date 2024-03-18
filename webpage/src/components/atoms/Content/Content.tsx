import { ReactNode } from "react";

type ContentProps = {
  className?: string;
  children?: ReactNode;
}

export function Content({ className, children }: ContentProps) {
  return <div className={`
    font-roboto text-justify leading-6 tracking-wider ${className}
    [&>p]:pb-4
  `}>
    {children}
  </div>
}