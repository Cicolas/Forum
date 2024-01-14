import { Link } from "react-router-dom";
import { Box } from "./components/Box";
import { ArticleNyTimes } from "phosphor-react";

export function Register() {
  return <div className="flex justify-center items-center bg-serenade-100 w-full min-h-screen text-shark-950 font-serif">
    <Box>
      <div className="flex flex-col w-full items-start gap-4 p-4 border-2 rounded-lg border-silver-chalice-400">
        <div className="flex justify-center items-center self-stretch">
          <ArticleNyTimes size={32} weight="bold"></ArticleNyTimes>
        </div>
        <h1 className="font-bold leading-normal text-2xl">Registrar</h1>

        <div className="flex flex-col items-start self-stretch gap-2 pb-2">
          Nome
          <input
            type="text"
            placeholder="Digite seu nome"
            className="py-2 px-4 content-between items-center self-stretch rounded-lg bg-opacity-25 bg-silver-chalice-400 leading-normal tracking-wider font-roboto text-justify"
          />
        </div>
        <div className="flex flex-col items-start self-stretch gap-2 pb-2">
          Email
          <input
            type="text"
            placeholder="Digite seu email"
            className="py-2 px-4 content-between items-center self-stretch rounded-lg bg-opacity-25 bg-silver-chalice-400 leading-normal tracking-wider font-roboto text-justify"
          />
        </div>
        <div className="flex flex-col items-start self-stretch gap-2 pb-2">
          Senha
          <input
            type="password"
            placeholder="Digite sua senha"
            className="py-2 px-4 content-between items-center self-stretch rounded-lg bg-opacity-25 bg-silver-chalice-400 leading-normal tracking-wider font-roboto text-justify"
          />
        </div>
        <div className="flex flex-col items-start self-stretch gap-2 pb-12">
          Foto
          <input
            type="text"
            placeholder="Link para foto"
            className="py-2 px-4 content-between items-center self-stretch rounded-lg bg-opacity-25 bg-silver-chalice-400 leading-normal tracking-wider font-roboto text-justify"
          />
        </div>

        <button className="flex p-4 justify-center text-center self-stretch rounded-lg bg-shark-950 font-bold text-serenade-100">
          Registrar
        </button>
        <button className="flex p-4 justify-center text-center self-stretch rounded-lg bg-opacity-25 bg-silver-chalice-400 ">
          Cancelar
        </button>
      </div>

      <div>
        <span className="font-light text-xs leading-normal text-silver-chalice-400">Já possui conta? </span>
        <Link className="font-semibold text-xs" to="/login">Entrar</Link>
      </div>
    </Box>
  </div>
}