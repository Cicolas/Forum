import { MouseEventHandler, ReactNode } from "react";

type ChipProps = {
  name: string;
  color?: string;
  className?: string;
  children?: ReactNode;

  onClick?: MouseEventHandler<HTMLSpanElement>;
}

export function Chip({ name, color, className, children, onClick }: ChipProps) {
  function handleClick(ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (!onClick) return;
    onClick(ev);
  }

  return <span
    className={`
      flex-inline items-start py-[0.125rem] px-[0.625rem]
      rounded-full bg-opacity-25 cursor-pointer
      ${className}
    `}
    style={{backgroundColor: color}}
    onClick={handleClick}
  >
    {name}
    {children}
  </span>
}