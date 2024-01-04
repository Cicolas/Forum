import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type UserLinkProps = {
  id: string;
  children: ReactNode;
}

export function UserLink({ id, children }: UserLinkProps) {
  return <Link to={`/user/${id}`} className="italic cursor-pointer">
    {children}
  </Link>
}