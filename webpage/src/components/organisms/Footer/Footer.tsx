import { Link } from "react-router-dom";

export function Footer() {
  return(
    <div className="flex justify-between items-center relative h-16 md:px-0 md:w-2/3 border-t-2 border-silver-chalice-400 border-opacity-50 tracking-wider leading-5">
      <Link to="https://github.com/andre-sch/forum" className="text-orient-700 italic">Github</Link>
      <span className="absolute -translate-x-1/2 left-1/2 text-silver-chalice-400"><span className="font-light">Feito por: </span>André Schlichting & Nícolas Carvalho</span>
      <span className="text-silver-chalice-400">UEM - 2024</span>
    </div>
  )
}
