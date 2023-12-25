import { ArticleNyTimes } from "phosphor-react";
import { Link } from "react-router-dom";

export function Head() {
  return(
    <div className="flex h-16 py-4 px-24 justify-between items-center self-stretch">
      <div className="flex w-8 h-[26px] items-center gap-4">
        <ArticleNyTimes size={32} weight="bold"></ArticleNyTimes>
      </div>
      <div className="absolute right-1/2 flex items-center gap-8 italic cursor-pointer tracking-wider translate-x-1/2">
        <Link to="home">Home</Link>
        <Link to="perfil">Perfil</Link>
        <Link to="sobre">Sobre</Link>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <span className="italic font-light">Olá! Elon Musk</span>
        <div className="flex w-8 h-8 items-center gap-4 bg-silver-chalice-400 rounded-full overflow-hidden">
          <img src="https://avatars.githubusercontent.com/u/32042329?v=4" />
          {/* <User size={32}></User> */}
        </div>
      </div>
    </div>
  )
}