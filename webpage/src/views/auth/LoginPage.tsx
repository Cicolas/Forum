import { Link, useNavigate } from "react-router-dom";
import { Box } from "./components/Box";
import { ArticleNyTimes } from "phosphor-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FormField } from "../../components/molecules/FormField/FormField";
import { Label } from "../../components/atoms/Label/Label";
import Input from "../../components/atoms/Input/Input";
import { Button } from "../../components/atoms/Button/Button";
import { Title } from "../../components/atoms/Title/Title";
import { Logo } from "../../components/atoms/Logo/Logo";
import { Modal } from "./components/Modal";

export function LoginPage() {
  const navigate = useNavigate();
  const { authenticated, login } = useContext(AuthContext);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  if (authenticated) navigate(-1);

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
  }

  return <div className="flex justify-center items-center bg-serenade-50 w-full min-h-screen text-shark-950 font-serif">
    <Box>
      <Modal>
        <Logo className="self-center"/>
        <Title>Entrar</Title>

        <FormField>
          <Label>Email</Label>
          <Input
            type="email"
            value={email??""}
            onChange={ev => setEmail(ev.target.value)}
            placeholder="Insira seu email"
          >
          </Input>
        </FormField>

        <FormField>
          <Label>Senha</Label>
          <Input
            type="password"
            value={password??""}
            onChange={ev => setPassword(ev.target.value)}
            placeholder="Insira sua senha"
          >
          </Input>
        </FormField>

        <Button
          text="Entrar"
          action="submit"
          onClick={() => handleLogin()}
          className="w-full mt-12 p-4 justify-center"
        >
        </Button>

        <Button
          text="Cancelar"
          action="cancel"
          onClick={() => navigate(-1)}
          className="w-full p-4 justify-center"
        >
        </Button>
      </Modal>

      <div>
        <Label size="xs" color="light-gray" light>
          Não está registrado?
        </Label>
        &nbsp;
        <Link to="/register">
          <Label size="xs" className="font-semibold">Registre-se</Label>
        </Link>
      </div>
    </Box>
  </div>
}