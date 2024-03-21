import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/atoms/Container/Container";
import dayjs from "dayjs";
import { PostListing } from "../../components/molecules/PostListing/PostListing";
import { IPost } from "../../utils/interfaces/post";
import { Pencil, Check } from "phosphor-react";
import { Spacer } from "../../components/atoms/Spacer/Spacer";
import { Label } from "../../components/atoms/Label/Label";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import IUser from "../../utils/interfaces/user";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";
import { Timestamp, timestampToDate } from "../../utils/types/timestamp";
import PostService from "../../services/PostService";
import { Modal } from "../../components/atoms/Modal/Modal";
import { FormField } from "../../components/molecules/FormField/FormField";
import Input from "../../components/atoms/Input/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/atoms/Button/Button";
import { Title } from "../../components/atoms/Title/Title";

const userFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Deve ser um email válido").optional(),
  avatarUrl: z.string().optional(),
});

type UserFormData = z.infer<typeof userFormSchema>

type UserDetailsProps = {
  name: string;
  avatarUrl: string;
  createdAt: Timestamp;
}

function UserDetails({ name, avatarUrl, createdAt }: UserDetailsProps) {
  const { user, permissions, fetchCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const canRename = permissions?.includes("update-user") &&
                    user?.name === name;

  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema)
  });

  const nameValue = watch("name");
  const emailValue = watch("email");
  const avatarUrlValue = watch("avatarUrl");

  async function handleUpdate(data: UserFormData) {
    try {
      if (!user) throw new Error("Usuário não encontrado.");

      const response = await UserService.updateUser({
        ...data,
        id: user.id,
        email: data.email === "" ? undefined : data.email,
        avatarUrl: data.avatarUrl??"",
      });

      toast.info("Usuário atualizado com sucesso!");
      await fetchCurrentUser();
      navigate(`/user/${response.name}`);
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message);
    } finally {
      setIsEditing(false);
    }
  }

  return <>
    <Modal open={isEditing} darken>
      <Title>Atualizar Usuário</Title>
      <form onSubmit={handleSubmit(handleUpdate)} className="w-full flex flex-col gap-4">
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
          text="Alterar*"
          disabled={isSubmitting}
          action="action"
          className="w-full mt-12 p-4 justify-center"
        >
        </Button>

        <Button
          text="Cancelar"
          action="cancel"
          onClick={(ev) => {setIsEditing(false); ev.preventDefault()}}
          className="w-full p-4 justify-center"
        >
        </Button>
      </form>
    </Modal>
    <div className="flex py-4 items-center gap-4 self-stretch">
      <button className="w-16 aspect-square rounded-full bg-silver-chalice-400 overflow-hidden object-cover">
        <img className="aspect-square" src={avatarUrl} />
      </button>
      <div className="items-start gap-2 leading-5">
        <div className="flex flex-row items-center justify-start gap-2">
          <Title size={"3.5xl"} className="leading-tight">{name}</Title>
          {canRename &&
            <Pencil
              size={24}
              weight="bold"
              className="text-silver-chalice-400 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
            </Pencil>
          }
        </div>
        <Spacer>
          <Label color="light-gray" light>Membro desde:</Label>
          <Label color="light-gray"> {dayjs(timestampToDate(createdAt)).locale("pt-br").format('MMMM[ de ]YYYY')}</Label>
        </Spacer>
      </div>
    </div>
  </>

}

export function UserPage() {
  const [ user, setUser ] = useState<IUser>();
  const [ posts, setPosts ] = useState<IPost[]>();

  const { userName } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await UserService.getUser(userName as string);
        setUser(user[0]);
      } catch (error) {
        if (error instanceof Error)
          toast.error(error.message);
      }
    }

    const fetchPosts = async () => {
      try {
        const posts = await PostService.getAllPost({
          author: userName as string
        });
        setPosts(posts);
      } catch (error) {
        if (error instanceof Error)
          toast.error(error.message);
      }
    }

    fetchUser();
    fetchPosts();
  }, [userName]);

  return <Container>
    {user &&
      <UserDetails name={user.name} avatarUrl={user.avatarUrl} createdAt={user.createdAt}></UserDetails>
    }
    {posts &&
      <PostListing title="Atividade" posts={posts}></PostListing>
    }
  </Container>
}