import { ReactNode } from "react";
import { Link } from "react-router-dom";
import IUser from "../../../utils/interfaces/user";

export type UserLinkProps = {
  to: IUser;
  children: ReactNode;
  className?: string;
}

export function UserLink({ to, children, className }: UserLinkProps) {
  return <Link to={`/user/${to.name}`}
    className={`italic cursor-pointer ${className} inline word-spacing-normal`}
  >
    {children}
  </Link>
}