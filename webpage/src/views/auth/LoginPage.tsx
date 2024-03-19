import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FormField } from "../../components/molecules/FormField/FormField";
import { Label } from "../../components/atoms/Label/Label";
import Input from "../../components/atoms/Input/Input";
import { Button } from "../../components/atoms/Button/Button";
import { Title } from "../../components/atoms/Title/Title";
import { Logo } from "../../components/atoms/Logo/Logo";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../components/atoms/Modal/Modal";

// TODO: colocar validacoes melhores
const loginFormSchema = z.object({
  email: z.string()
    .min(1, "Email é obrigatório")
    .email("Deve ser um email válido"),
  password: z.string()
    .min(1, "Senha é obrigatória")
})

type loginFormData = z.infer<typeof loginFormSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { authenticated, login } = useContext(AuthContext);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema)
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  if (authenticated) navigate("/home");

  async function handleLogin(data: loginFormData) {
    try {
      await login(data.email, data.password);
      toast.info("Login realizado com sucesso!");
    } catch (err) {
      if (err instanceof Error) {
        toast.warn(err.message);
      } else {
        throw err;
      }
    }
  }

  // <div className="flex flex-col justify-center items-center bg-serenade-50 w-full min-h-screen text-shark-950 font-serif">

  return <Modal open subElement={
        <div>
          <Label size="xs" color="light-gray" light>
            Não está registrado?
          </Label>
          &nbsp;
          <Link to="/register">
            <Label size="xs" className="font-semibold">Registre-se</Label>
          </Link>
        </div>
      }
      className="font-serif"
    >
      <Logo className="self-center"/>
      <Title>Entrar</Title>

      <form onSubmit={handleSubmit(handleLogin)} className="w-full flex flex-col gap-4">
        <FormField haveError={!!errors.email} errorMessage={errors.email?.message}>
          <Label>Email</Label>
          <Input
            type="text"
            // {...register("email")}
            value={emailValue??""}
            onChange={ev => setValue("email", ev.target.value)}
            placeholder="Insira seu email"
          >
          </Input>
        </FormField>

        <FormField haveError={!!errors.password} errorMessage={errors.password?.message}>
          <Label>Senha</Label>
          <Input
            type="password"
            value={passwordValue??""}
            onChange={ev => setValue("password", ev.target.value)}
            placeholder="Insira sua senha"
          >
          </Input>
        </FormField>

        <Button
          text="Entrar"
          disabled={isSubmitting}
          action="submit"
          className="w-full mt-12 p-4 justify-center"
        >
        </Button>

        <Button
          text="Cancelar"
          action="cancel"
          onClick={(ev) => {navigate("/home"); ev.preventDefault()}}
          className="w-full p-4 justify-center"
        >
        </Button>
      </form>
    </Modal>
}