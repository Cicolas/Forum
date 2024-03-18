import { Link, useNavigate } from "react-router-dom";
import { Box } from "./components/Box";
import { FormField } from "../../components/molecules/FormField/FormField";
import { Logo } from "../../components/atoms/Logo/Logo";
import { Title } from "../../components/atoms/Title/Title";
import { Modal } from "./components/Modal";
import Input from "../../components/atoms/Input/Input";
import { Label } from "../../components/atoms/Label/Label";
import { useState } from "react";
import { Button } from "../../components/atoms/Button/Button";

export function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [avatar, setAvatar] = useState<string>();

  return <div className="flex justify-center items-center bg-serenade-50 w-full min-h-screen text-shark-950 font-serif">
    <Box>
      <Modal>
        <Logo className="self-center"/>
        <Title>Registrar</Title>

        <FormField>
          <Label>Nome</Label>
          <Input
            type="text"
            value={name??""}
            onChange={ev => setName(ev.target.value)}
            placeholder="Insira seu nome"
          >
          </Input>
        </FormField>

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

        <FormField>
          <Label>Foto</Label>
          <Input
            type="url"
            value={avatar??""}
            onChange={ev => setAvatar(ev.target.value)}
            placeholder="Insira o link de sua foto"
          >
          </Input>
        </FormField>

        <Button
          text="Registrar"
          action="action"
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
          Já possui conta?
        </Label>
        &nbsp;
        <Link to="/login">
          <Label size="xs" className="font-semibold">Entrar</Label>
        </Link>
      </div>
    </Box>
  </div>
}