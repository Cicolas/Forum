import { Link } from "react-router-dom";

type CategoryChipsProps = {
  name: string;
  color: string;
};

export function CategoryChips({ name, color }: CategoryChipsProps) {
  return (
    <Link
      to={`/feed/category?name=${name}`}
      className="flex items-start py-[0.125rem] px-[0.625rem] rounded-full bg-opacity-25 cursor-pointer"
      style={{backgroundColor: color}}
    >
      {name}
    </Link>
  )
}