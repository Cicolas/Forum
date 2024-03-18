import { Link } from "react-router-dom";
import { Chip } from "../../atoms/Chips/Chip";

export function AddCategoryChip() {
  return <Link
    to="/admin/category?newCategory=true"
  >
    <Chip name="+ Nova" color="#a6a6a640"></Chip>
  </Link>
}