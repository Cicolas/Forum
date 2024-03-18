type ChipProps = {
  name: string;
  color?: string;
  className?: string;

  onClick?: () => void;
}

export function Chip({ name, color, className, onClick }: ChipProps) {
  function handleClick() {
    if (!onClick) return;
    onClick();
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
  </span>
}