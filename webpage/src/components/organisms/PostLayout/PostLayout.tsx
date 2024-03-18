import dayjs from "dayjs";
import { KeyReturn } from "phosphor-react";
import { List } from "ts-toolbelt";
import { Bullet } from "../../atoms/Bullet/Bullet";
import { Container } from "../../atoms/Container/Container";
import { Content } from "../../atoms/Content/Content";
import { Label } from "../../atoms/Label/Label";
import { Spacer } from "../../atoms/Spacer/Spacer";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { Title } from "../../atoms/Title/Title";
import { UserLink } from "../../atoms/UserLink/UserLink";
import { CategoryChip } from "../../molecules/Chips/CategoryChip";
import { LikeButton } from "../../molecules/LikeButton/LikeButton";
import { ICategory } from "../../../utils/interfaces/category";
import { IComment } from "../../../utils/interfaces/comment";
import { ChangeEvent, ChangeEventHandler, ReactNode, useState } from "react";
import LikeService from "../../../services/LikeService";
import { VoteType } from "../../../utils/types/vote";
import { AddPostCategoryChip } from "../../molecules/Chips/AddPostCategoryChip";
import Input from "../../atoms/Input/Input";
import { Button } from "../../atoms/Button/Button";

type PostLayoutProps = {
  likable?: boolean;
  editable?: boolean;
  comments?: IComment[];
  id?: string;
  title: string;
  author: string;
  categories: {name: string, color: string}[];
  content: string;
  createdAt?: Date;

  onTitleChange?: ChangeEventHandler<HTMLInputElement>;
}

type TitleWrapperProps = {
  title: string,
  editable?: boolean,

  onTitleChange?: ChangeEventHandler<HTMLInputElement>;
}

function TitleWrapper({ title, onTitleChange, editable }: TitleWrapperProps) {
  function handleTitleChange(ev: ChangeEvent<HTMLInputElement>) {
    if (editable && !onTitleChange) throw Error("TitleWrapper is editable but doesn't implement onTitleChange");
    if (onTitleChange) onTitleChange(ev);
  }

  return <>{editable ?
    <Input
      value={title}
      type={"text"}
      placeholder={"Título"}
      onChange={handleTitleChange}
      className="text-3.5xl font-black font-serif leading-tight tracking-[0rem] focus:outline-none"
      controlledTextStyle
      borderless
    >
    </Input>
    :
    <Title size="3.5xl" className="leading-tight">{title}</Title>
  }</>
}

export function PostLayout(
  { id, title, author, categories,
    content, createdAt, likable,
    editable, comments, onTitleChange  }: PostLayoutProps) {
  const [likeState, setLikeState] = useState<VoteType>("undefined");

  const handleVote = (vote: VoteType) => {
    if (!id) return;

    const action = vote === "upvote" ? LikeService.likePost : LikeService.dislikePost;

    action(id).then(() => {
      if (likeState === vote)
        setLikeState("undefined");
      else
        setLikeState(vote);
    });
  }

  return <Container className="py-4">
  <div className="flex flex-row justify-between items-center self-stretch">
    <div className="flex flex-col items-start gap-1">
      <Spacer>
        <UserLink to="cicolas">
          {author}
        </UserLink>
        &nbsp;
        <Label light>em</Label>
        &nbsp;
        {categories?.map(CategoryChip)}
        {editable && AddPostCategoryChip()}
      </Spacer>

      <TitleWrapper
        title={title}
        editable={editable}
        onTitleChange={onTitleChange}
      >
      </TitleWrapper>
    </div>

    {likable &&
      <LikeButton
        count={24}
        orientation="horizontal"
        state={likeState}
        onLike={handleVote.bind(undefined, "upvote")}
        onDislike={handleVote.bind(undefined, "downvote")}
        className="hidden md:flex"
      >
      </LikeButton>
    }
  </div>

  <Content className="flex flex-col gap-2 self-stretch">
    {!editable ? content :
      <TextArea placeholder={"Conteúdo do post"} value={content} minHeight="10rem" >
      </TextArea>
    }

    {!editable &&
      <Spacer className="text-silver-chalice-400 font-serif">
        <Label>
          {dayjs(createdAt).format("HH:mm")}
        </Label>
        &nbsp;
        <Bullet/>
        &nbsp;
        <Label>
          {dayjs(createdAt).locale("pt-br").format('DD[ de ]MMMM[ de ]YYYY')}
        </Label>
      </Spacer>
    }

    {editable &&
      <div className="self-end pt-4 gap-2 inline-flex">
        <Button
          text={"Descartar"}
          action="cancel"
          className="py-2 px-4"
          onClick={(ev) => {ev.preventDefault()}}
        >
        </Button>
        <Button
          text="Salvar"
          action="submit"
          className="py-2 px-4"
        >
        </Button>
      </div>
    }
  </Content>

  {/* <Content>
    <div className="pb-2 self-stretch border-b-2 border-solid border-silver-chalice-400">
      <Title className="tracking-wider">Comentários</Title>
    </div>

    <div className="flex flex-row pr-4 pl-1 pt-4 content-between items-center self-stretch gap-2">
      <TextArea
        value={comment}
        onChange={(ev) => setComment(ev.target.value)}
        placeholder="Adicionar um Comentário"
        minHeight="2.5em"
        className="flex-grow flex-shrink-0"
        borderless
      >
      </TextArea>

      <KeyReturn size={32} className="text-silver-chalice-400 cursor-pointer">
      </KeyReturn>
    </div>
  </Content>

  <List>
    <Comment value={_comment}></Comment>
  </List> */}
</Container>
}