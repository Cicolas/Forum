import { Link } from "react-router-dom";
import { Chip } from "../../atoms/Chips/Chip";

type CategoryChipsProps = {
  name: string;
  color: string;
};

export function CategoryChip({ name, color }: CategoryChipsProps) {
  return <Link
    to={`/feed/category/${name}`}
  >
    <Chip name={name} color={color}></Chip>
  </Link>
}