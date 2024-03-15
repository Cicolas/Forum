import { Link, useNavigate } from "react-router-dom";
import { Box } from "./components/Box";
import { ArticleNyTimes } from "phosphor-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { InputField } from "../../components/InputField";

export function Login() {
  const navigate = useNavigate();
  const { authenticated, login } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) navigate(-1);
  }, [authenticated, navigate])

  async function handleLogin() {
    try {
      await login();
      toast.info("Login realizado com sucesso!");
    } catch (err) {
      if (err instanceof Error) {
        toast.warn(err.message);
      } else {
        throw err;
      }
    }

    navigate(-1);
  }

  return <div className="flex justify-center items-center bg-serenade-50 w-full min-h-screen text-shark-950 font-serif">
    <Box>
      <div className="flex flex-col w-full items-start gap-4 p-4 border-2 rounded-lg border-silver-chalice-400">
        <div className="flex justify-center items-center self-stretch">
          <ArticleNyTimes size={32} weight="bold"></ArticleNyTimes>
        </div>
        <h1 className="font-bold leading-normal text-2xl">Entrar</h1>

        <InputField
          title="Email"
          type="email"
          placeholder="Insira seu email"
        >
        </InputField>

        <InputField
          title="Senha"
          type="password"
          placeholder="Digite sua senha"
        >
        </InputField>

        <button onClick={() => handleLogin()} className="flex mt-12 p-4 justify-center text-center self-stretch rounded-lg bg-olive-drab-700 font-bold text-serenade-100">
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