import { Link, useNavigate } from "react-router-dom";
import { Box } from "./components/Box";
import { ArticleNyTimes } from "phosphor-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { authenticated, login } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) navigate(-1);
  }, [ authenticated, navigate ])

  function loginSubmit() {
    login().then(() => navigate(-1));
  }

  return <div className="flex justify-center items-center bg-serenade-50 w-full min-h-screen text-shark-950 font-serif">
    <Box>
      <div className="flex flex-col w-full items-start gap-4 p-4 border-2 rounded-lg border-silver-chalice-400">
        <div className="flex justify-center items-center self-stretch">
          <ArticleNyTimes size={32} weight="bold"></ArticleNyTimes>
        </div>
        <h1 className="font-bold leading-normal text-2xl">Entrar</h1>

        <div className="flex flex-col items-start self-stretch gap-2 pb-2">
          Email
          <input
            type="email"
            placeholder="Digite seu email"
            className="py-2 px-4 content-between items-center self-stretch rounded-lg bg-opacity-25 bg-silver-chalice-400 leading-normal tracking-wider font-roboto text-justify"
          />
        </div>
        <div className="flex flex-col items-start self-stretch gap-2 pb-12">
          Senha
          <input
            type="password"
            placeholder="Digite sua senha"
            className="py-2 px-4 content-between items-center self-stretch rounded-lg bg-opacity-25 bg-silver-chalice-400 leading-normal tracking-wider font-roboto text-justify"
          />
        </div>

        <button onClick={() => loginSubmit()} className="flex p-4 justify-center text-center self-stretch rounded-lg bg-olive-drab-700 font-bold text-serenade-100">
          Entrar
        </button>
        <button onClick={() => navigate(-1)} className="flex p-4 justify-center text-center self-stretch rounded-lg bg-opacity-25 bg-silver-chalice-400">
          Cancelar
        </button>
      </div>

      <div>
        <span className="font-light text-xs leading-normal text-silver-chalice-400">Não está registrado? </span>
        <Link className="font-semibold text-xs" to="/register">Registre-se</Link>
      </div>
    </Box>
  </div>
}