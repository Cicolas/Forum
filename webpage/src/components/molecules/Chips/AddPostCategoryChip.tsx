import { MouseEventHandler } from "react";
import { Chip } from "../../atoms/Chips/Chip";

type AddPostCategoryChipProps = {
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

export function AddPostCategoryChip({ onClick }: AddPostCategoryChipProps) {
  return <button>
    <Chip onClick={onClick} name="+ Adicionar" color="#a6a6a640"></Chip>
  </button>
}