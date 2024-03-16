import { Link } from "react-router-dom";

type ChipProps = {
  name: string;
  color?: string;
  className?: string;

  onClick?: () => void;
}

type CategoryChipsProps = {
  name: string;
  color: string;
};

export function Chip({ name, color, className, onClick }: ChipProps) {
  function handleClick() {
    if (!onClick) return;
    onClick();
  }

  return <span
    className={`flex items-start py-[0.125rem] px-[0.625rem] rounded-full bg-opacity-25 cursor-pointer ${className}`}
    style={{backgroundColor: color}}
    onClick={handleClick}
  >
    {name}
  </span>
}

export function CategoryChip({ name, color }: CategoryChipsProps) {
  return <Link
    to={`/feed/category/${name}`}
  >
    <Chip name={name} color={color}></Chip>
  </Link>
}

export function AdminCategoryChips({name, color}: CategoryChipsProps) {
  return <Link
    to={`/admin/category?categoryName=${name}`}
  >
    <Chip name={name} color={color}></Chip>
  </Link>
}

export function AddCategoryChip() {
  return <Link
    to="/admin/category?newCategory=true"
  >
    <Chip name="+ Nova" color="#a6a6a640"></Chip>
  </Link>
}