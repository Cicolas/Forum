import { ReactNode } from "react";
import { sizes, colors } from "../../../utils/defaultStyles";

type LabelProps = {
  bold?: boolean;
  light?: boolean;
  italic?: boolean;
  pointer?: boolean;
  className?: string;
  size?: keyof typeof sizes;
  color?: keyof typeof colors;

  children: ReactNode;
}

export function Label({ children, bold, light, italic, pointer, size, color, className }: LabelProps) {
  return <span className={`
    ${bold  && "font-bold"}
    ${light && "font-light"}
    ${italic && "italic"}
    ${pointer && "cursor-pointer"}
    ${sizes[size??"base"]}
    ${color && colors[color]}
    word-spacing-normal
    ${className}
  `}>
    {children}
  </span>
}