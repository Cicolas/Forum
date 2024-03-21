import { Chip } from "../../atoms/Chips/Chip";
import { X } from "phosphor-react";
import { Spacer } from "../../atoms/Spacer/Spacer";

type RemovableCategoryChipProps = {
  name: string;
  color: string;
  removed: boolean;

  onClick?: (name: string) => void;
}

export function RemovableCategoryChip({ name, color, removed, onClick }: RemovableCategoryChipProps) {
  const handleClick = () => {
    if (onClick) onClick(name);
  }

  return <Chip
    name={name}
    className={removed ? "text-silver-chalice-400" : "text-shark-950"}
    color={removed ? "#a6a6a640" : color}
    onClick={(ev)=>{handleClick(); ev.preventDefault()}
  }>
    {!removed &&
      <Spacer className="inline">
        &nbsp;
        <X weight="bold" size={16} className="inline -mt-[0.1rem]"></X>
      </Spacer>
    }
  </Chip>
}