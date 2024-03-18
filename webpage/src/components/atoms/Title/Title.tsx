import { sizes } from "../../../utils/defaultStyles";
import { Label } from "../Label/Label";

type TitleProps = {
  size?: keyof typeof sizes;
  className?: string;

  children: string;
}

export function Title({ size, children, className }: TitleProps) {
  return <Label
    size={size??"2xl"}
    color="black"
    className={`leading-normal font-serif ${className}`}
    bold
  >
    {children}
  </Label>
}