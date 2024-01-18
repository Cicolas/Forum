import { Link } from "react-router-dom";

export function Footer() {
  return(
    <div className="flex justify-between items-center relative h-16 md:px-0 md:w-2/3 border-t-2 border-silver-chalice-400 border-opacity-25 tracking-wider leading-5">
      <Link to="https://github.com" className="text-orient-700 italic">Github</Link>
      <span className="absolute -translate-x-1/2 left-1/2 text-silver-chalice-400"><span>Feito por: </span>André Schlichting & Nícolas Carvalho</span>
      <span className="text-silver-chalice-400">UEM - 2024</span>
    </div>
  )
}