import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type UserLinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
}

export function UserLink({ to, children, className }: UserLinkProps) {
  return <Link to={`/user/${to}`}
    className={`italic cursor-pointer ${className} inline word-spacing-normal`}
  >
    {children}
  </Link>
}