import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
  isLink?: boolean;
}

export function Logo({ className, isLink }: LogoProps) {
  return isLink ? 
    <Link to="/home">
      <img src="logo.png" className={`w-12 rounded-t-sm ${className}`}></img>
    </Link>
    :
    <img src="logo.png" className={`w-12 rounded-t-sm ${className}`}></img>
}