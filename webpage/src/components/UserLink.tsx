import { Link } from "react-router-dom";

export type UserLinkProps = {
  id: string;
  children: string;
}

export function UserLink({ id, children }: UserLinkProps) {
  return <Link to={`/user/${id}`} className="italic cursor-pointer">
    {children}
  </Link>
}