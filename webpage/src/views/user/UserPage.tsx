import { useLoaderData } from "react-router-dom";
import { Container } from "../../components/atoms/Container/Container";
import dayjs from "dayjs";
import { PostListing } from "../../components/molecules/PostListing/PostListing";
import { IPost } from "../../utils/interfaces/post";
import { Pencil, Check } from "phosphor-react";
import { Title } from "../../components/atoms/Title/Title";
import { Spacer } from "../../components/atoms/Spacer/Spacer";
import { Label } from "../../components/atoms/Label/Label";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import IUser from "../../utils/interfaces/user";
import { TitleInputWrapper } from "../../components/molecules/TitleInputWrapper/TitleInputWrapper";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";
// import { getAllPostByUser } from "../../services/PostService";

type LoaderDataValue = {
  user?: IUser;
  posts?: IPost[];
}

type UserDetailsProps = {
  name: string;
  createdAt: Date;
}

function UserDetails({ name, createdAt }: UserDetailsProps) {
  const { user, permissions } = useContext(AuthContext);
  const canRename = permissions.includes("update-user") &&
                    user?.name === name;

  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(name);

  async function handleRename() {
    if (nameValue !== name) {
      try {
        if (!user) throw new Error("Usuário não encontrado.");

        await UserService.updateUser(
          {...user, name: nameValue},
        );
      } catch (error) {
        setNameValue(name);
        toast.error("Erro ao atualizar nome.");
      }
      setIsEditing(false);
    }
  }

  return <div className="flex py-4 items-center gap-4 self-stretch">
    <img className="w-16 rounded-full" src="https://avatars.githubusercontent.com/u/32042329?v=4" />
    <div className="items-start gap-2 leading-5">
      <div className="flex flex-row items-center justify-start gap-2">
        <TitleInputWrapper
          title={nameValue}
          editable={isEditing && canRename}
          onTitleChange={(ev) => setNameValue(ev.target.value)}
          size="2xl"
        >
        </TitleInputWrapper>
        {canRename &&
          isEditing ?
          <Check
            size={24}
            weight="bold"
            className="text-olive-drab-700"
            onClick={handleRename}
          >
          </Check>
          :
          <Pencil
            size={24}
            weight="bold"
            className="text-silver-chalice-400"
            onClick={() => setIsEditing(true)}
          >
          </Pencil>
        }
      </div>
      <Spacer>
        <Label color="light-gray" light>Membro desde:</Label>
        <Label color="light-gray"> {dayjs(createdAt).locale("pt-br").format('MMMM[ de ]YYYY')}</Label>
      </Spacer>
    </div>
  </div>
}

export function UserPage() {
  const { user, posts }: LoaderDataValue = useLoaderData() as LoaderDataValue;

  return <Container>
    <UserDetails name={user?.name??""} createdAt={new Date(0)}></UserDetails>
    <PostListing title="Atividade" posts={posts??[]}></PostListing>
  </Container>
}