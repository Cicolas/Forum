import { Link } from "react-router-dom";
import { Chip } from "../../atoms/Chips/Chip";

type AdminCategoryChipProps = {
  name: string;
  color: string;
};


export function AdminCategoryChip({name, color}: AdminCategoryChipProps) {
  return <Link
    key={name}
    to={`/admin/category?categoryName=${name}`}
  >
    <Chip name={name} color={color}></Chip>
  </Link>
}