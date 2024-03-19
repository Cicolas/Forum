import dayjs from "dayjs";
import { Bullet } from "../../atoms/Bullet/Bullet";
import { Container } from "../../atoms/Container/Container";
import { Content } from "../../atoms/Content/Content";
import { Label } from "../../atoms/Label/Label";
import { Spacer } from "../../atoms/Spacer/Spacer";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { UserLink } from "../../atoms/UserLink/UserLink";
import { CategoryChip } from "../../molecules/Chips/CategoryChip";
import { LikeButton } from "../../molecules/LikeButton/LikeButton";
import { ICategory } from "../../../utils/interfaces/category";
import { IComment } from "../../../utils/interfaces/comment";
import { ChangeEventHandler, ReactNode, useContext, useState } from "react";
import LikeService from "../../../services/LikeService";
import { VoteType } from "../../../utils/types/vote";
import { AddPostCategoryChip } from "../../molecules/Chips/AddPostCategoryChip";
import { Button } from "../../atoms/Button/Button";
import { AuthContext } from "../../../context/AuthContext";
import { TitleInputWrapper } from "../../molecules/TitleInputWrapper/TitleInputWrapper";
import { CategoryFormModal } from "../CategoryFormModal/CategoryFormModal";
import { Chip } from "../../atoms/Chips/Chip";
import { FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { newPostFormData } from "../../../views/post/NewPostPage";
import { useNavigate } from "react-router-dom";

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

  isSubmiting?: boolean;
  errors?: FieldErrors<newPostFormData>;
  handleSubmit?: UseFormHandleSubmit<newPostFormData>;
  onSubmit?: (data: newPostFormData) => Promise<void>;

  onCategoriesChange?: (categories: ICategory[]) => void;
  onTitleChange?: ChangeEventHandler<HTMLInputElement>;
  onContentChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

type PostWrapperProps = {
  editable?: boolean;
  children: ReactNode;
  handleSubmit?: UseFormHandleSubmit<newPostFormData>;
  onSubmit?: (data: newPostFormData) => Promise<void>;
}

function PostWrapper({ children, editable, handleSubmit, onSubmit }: PostWrapperProps) {
  function safeHandleSubmit() {
    if (handleSubmit && onSubmit)
      return handleSubmit(onSubmit);
  }

  return <>{editable ?
    <form onSubmit={safeHandleSubmit()} className="flex flex-col gap-2 self-stretch">
      {children}
    </form>
    :
    <>
      {children}
    </>
  }</>

}

export function PostLayout(
  { id, title, author, categories,
    content, createdAt, likable,
    editable, comments, onTitleChange,
    onContentChange, onCategoriesChange,
    isSubmiting, errors, handleSubmit, onSubmit
  }: PostLayoutProps) {
  const navigate = useNavigate();
  const { user, permissions } = useContext(AuthContext);

  const canCreate = permissions.includes("create-contribution");
  const canUpdate = permissions.includes("update-contribution") &&
                    author === user?.name;
  const canDelete = permissions.includes("delete-contribution");
  const canRank = permissions.includes("rank-contribution");

  const [likeState, setLikeState] = useState<VoteType>("undefined");

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

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

  return <>
    <CategoryFormModal
      open={categoryModalOpen && canUpdate}
      requestClose={() => setCategoryModalOpen(false)}
      onSubmit={(cat) => {if (onCategoriesChange) onCategoriesChange(cat)}}
    >
    </CategoryFormModal>

    <Container className="py-4">
      <PostWrapper handleSubmit={handleSubmit} onSubmit={onSubmit} editable={editable && canUpdate}>
        <div className="flex flex-row justify-between items-center self-stretch">
          <div className="flex flex-col items-start gap-1">
            <Spacer>
              <UserLink to="cicolas">
                {author}
              </UserLink>
              &nbsp;
              <Label light>em</Label>
              &nbsp;
              {categories.map((category) => <>
                {editable ?
                  <Chip {...category}></Chip>
                  :
                  <CategoryChip {...category}></CategoryChip>
                }
                &nbsp;
              </>
              )}
              {editable &&
                <AddPostCategoryChip
                  onClick={(ev) => {
                    setCategoryModalOpen(true);
                    ev.preventDefault();
                  }}
                >
                </AddPostCategoryChip>
              }
            </Spacer>

            <TitleInputWrapper
              title={title}
              editable={editable}
              onTitleChange={onTitleChange}
              borderless
            >
            </TitleInputWrapper>
          </div>

          {likable &&
            <LikeButton
              count={24}
              disabled={!canRank}
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
          {!editable ?
            content
            :
            <TextArea
              placeholder={"Conteúdo do post"}
              value={content}
              onChange={onContentChange}
              minHeight="10rem"
            >
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

          {editable && canCreate &&
            <div className="self-end pt-4 gap-2 inline-flex">
              <Button
                text={"Descartar"}
                action="cancel"
                className="py-2 px-4"
                onClick={(ev) => {
                  navigate(-1);
                  ev.preventDefault()
                }}
              >
              </Button>
              <Button
                text="Salvar"
                disabled={isSubmiting}
                action="submit"
                onClick={() => {}}
                className="py-2 px-4"
              >
              </Button>
            </div>
          }
        </Content>
      </PostWrapper>

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
  </>
}