import { Link, useNavigate } from "react-router-dom";
import { FormField } from "../../components/molecules/FormField/FormField";
import { Logo } from "../../components/atoms/Logo/Logo";
import { Title } from "../../components/atoms/Title/Title";
import Input from "../../components/atoms/Input/Input";
import { Label } from "../../components/atoms/Label/Label";
import { useContext } from "react";
import { Button } from "../../components/atoms/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "../../components/atoms/Modal/Modal";

const registerFormSchema = z.object({
  name: z.string()
    .min(1, "Nome é obrigatório"),
  email: z.string()
    .min(1, "Email é obrigatório")
    .email("Deve ser um email válido"),
  password: z.string()
    .min(1, "Senha é obrigatória!"),
  avatarUrl: z.string().optional()
})

type registerFormData = z.infer<typeof registerFormSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { authenticated, register } = useContext(AuthContext);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<registerFormData>({
    resolver: zodResolver(registerFormSchema)
  });

  const nameValue = watch("name");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const avatarUrlValue = watch("avatarUrl");

  if (authenticated) navigate("/home");

  async function handleRegister(data: registerFormData) {
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        avatarUrl: data.avatarUrl??""
      });
      toast.info("Registro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        throw err;
      }
    }
  }

  return <Modal open subElement={
        <div>
          <Label size="xs" color="light-gray" light>
            Já possui conta?
          </Label>
          &nbsp;
          <Link to="/login">
            <Label size="xs" className="font-semibold">Entrar</Label>
          </Link>
        </div>
      }
      className="font-serif"
    >
      <Logo className="self-center"/>
      <Title>Registrar</Title>

      <form onSubmit={handleSubmit(handleRegister)} className="w-full flex flex-col gap-4">
        <FormField haveError={!!errors.name} errorMessage={errors.name?.message}>
          <Label>Nome</Label>
          <Input
            type="text"
            value={nameValue??""}
            onChange={ev => setValue("name", ev.target.value)}
            placeholder="Insira seu nome"
          >
          </Input>
        </FormField>

        <FormField haveError={!!errors.email} errorMessage={errors.email?.message}>
          <Label>Email</Label>
          <Input
            type="email"
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

        <FormField haveError={!!errors.avatarUrl} errorMessage={errors.avatarUrl?.message}>
          <Label>Foto</Label>
          <Input
            type="url"
            value={avatarUrlValue??""}
            onChange={ev => setValue("avatarUrl", ev.target.value)}
            placeholder="Insira o link de sua foto"
          >
          </Input>
        </FormField>

        <Button
          text="Registrar"
          disabled={isSubmitting}
          action="action"
          className="w-full mt-12 p-4 justify-center"
        >
        </Button>

        <Button
          text="Cancelar"
          action="cancel"
          onClick={(ev) => {navigate("/login"); ev.preventDefault()}}
          className="w-full p-4 justify-center"
        >
        </Button>
      </form>
    </Modal>
}