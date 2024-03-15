import { Link, useNavigate } from "react-router-dom";
import { Box } from "./components/Box";
import { ArticleNyTimes } from "phosphor-react";
import { InputField } from "../../components/InputField";

export function Register() {
  const navigate = useNavigate();

  return <div className="flex justify-center items-center bg-serenade-50 w-full min-h-screen text-shark-950 font-serif">
    <Box>
      <div className="flex flex-col w-full items-start gap-4 p-4 border-2 rounded-lg border-silver-chalice-400">
        <div className="flex justify-center items-center self-stretch">
          <ArticleNyTimes size={32} weight="bold"></ArticleNyTimes>
        </div>
        <h1 className="font-bold leading-normal text-2xl">Registrar</h1>

        <InputField
          title="Nome"
          type="text"
          placeholder="Digite seu nome"
        >
        </InputField>

        <InputField
          title="Email"
          type="email"
          placeholder="Digite seu email"
        >
        </InputField>

        <InputField
          title="Senha"
          type="password"
          placeholder="Digite sua senha"
        >
        </InputField>

        <InputField
          title="Foto"
          type="url"
          placeholder="Insira o url da foto"
        >
        </InputField>

        <button className="flex mt-12 p-4 justify-center text-center self-stretch rounded-lg bg-shark-950 font-bold text-serenade-100">
          Registrar
        </button>
        <button onClick={()=> navigate(-1)}  className="flex p-4 justify-center text-center self-stretch rounded-lg bg-opacity-25 bg-silver-chalice-400 ">
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