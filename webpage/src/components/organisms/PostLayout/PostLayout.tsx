import { Container } from "../../atoms/Container/Container";
import { Content } from "../../atoms/Content/Content";
import { Label } from "../../atoms/Label/Label";
import { Spacer } from "../../atoms/Spacer/Spacer";
import { UserLink } from "../../atoms/UserLink/UserLink";
import { CategoryChip } from "../../molecules/Chips/CategoryChip";
import { LikeButton } from "../../molecules/LikeButton/LikeButton";
import { ICategory } from "../../../utils/interfaces/category";
import { ChangeEventHandler, ReactNode, useContext, useEffect, useState } from "react";
import RankService, { RankAction } from "../../../services/RankService";
import { VoteType } from "../../../utils/types/vote";
import { AddPostCategoryChip } from "../../molecules/Chips/AddPostCategoryChip";
import { AuthContext } from "../../../context/AuthContext";
import { TitleInputWrapper } from "../../molecules/TitleInputWrapper/TitleInputWrapper";
import { CategoryFormModal } from "../CategoryFormModal/CategoryFormModal";
import { Chip } from "../../atoms/Chips/Chip";
import { useNavigate } from "react-router-dom";
import { IThread } from "../../../utils/interfaces/thread";
import { countRank } from "../../../utils/countRank";
import { PostContent } from "../PostContent/PostContent";
import { PostContentForm } from "../PostContentForm/PostContentForm";
import { CommentSection } from "../CommentSection/CommentSection";
import { toast } from "react-toastify";
import { getUserRankState } from "../../../utils/getUserRankState";
import { voteContribution } from "../../../utils/voting";

type PostLayoutProps = {
  likable?: boolean;
  editable?: boolean;
  post: IThread;

  onSubmit?: () => Promise<void>;

  onCategoriesChange?: (categories: ICategory[]) => void;
  onTitleChange?: ChangeEventHandler<HTMLInputElement>;
  onContentChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

type PostWrapperProps = {
  editable?: boolean;
  children: ReactNode;
  onSubmit?: () => Promise<void>;
}

function PostWrapper({ children, editable, onSubmit }: PostWrapperProps) {
  function safeHandleSubmit() {
    if (onSubmit) return onSubmit;
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
  { post,
    likable,
    editable,
    onTitleChange,
    onContentChange,
    onCategoriesChange,
    onSubmit
  }: PostLayoutProps) {
  const navigate = useNavigate();
  const { user, permissions } = useContext(AuthContext);

  const {
    id,
    title,
    author,
    categories,
    content,
    createdAt
  } = post;

  const likeCount = countRank(post);

  const canCreateAndUpdate = permissions?.includes("update-contribution") &&
                             author.name === user?.name;
  const canDelete = permissions?.includes("delete-contribution") &&
                    author.name === user?.name;
  const canRank = permissions?.includes("rank-contribution") || true;

  const [ likeState, setLikeState ] = useState<VoteType>();
  const [ hasVoted, setHasVoted ] = useState<VoteType>();

  const [ categoryModalOpen, setCategoryModalOpen ] = useState(false);
  const [ isSubmiting, setIsSubmiting ] = useState(false);

  useEffect(() => {
    if (user) {
      const rank = getUserRankState(post, user.id);
      setHasVoted(rank);
      setLikeState(rank);
    }
  }, [user, post])

  const handleVote = async (rank: VoteType) => {
    voteContribution({
      user,
      contributionId: id,
      rank,
      likeState,
      setLikeState
    });
  }

  const handleSubmit = async() => {
    if (onSubmit) {
      setIsSubmiting(true);
      await onSubmit();
      setIsSubmiting(false);
    }
  }

  return <>
    <CategoryFormModal
      open={categoryModalOpen && !!canCreateAndUpdate}
      requestClose={() => setCategoryModalOpen(false)}
      onSubmit={(cat) => {if (onCategoriesChange) onCategoriesChange(cat)}}
    >
    </CategoryFormModal>

    <Container className="py-4">
      <PostWrapper onSubmit={handleSubmit} editable={editable && canCreateAndUpdate}>
        <div className="flex flex-row justify-between items-center self-stretch">
          <div className="flex flex-col items-start gap-1">
            <Spacer>
              <UserLink to={author}>
                {author.name}
              </UserLink>
              &nbsp;
              {categories.length ? <Label light>em</Label> : ""}
              &nbsp;
              {categories.map((category) => <>
                {editable ?
                  <Chip {...category}></Chip>
                  :
                  <CategoryChip {...category}></CategoryChip>
                }
                &nbsp;
              </>)}
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
              count={likeCount??0}
              disabled={!canRank}
              orientation="horizontal"
              state={likeState}
              hasVoted={hasVoted}
              onLike={() => handleVote("upvote")}
              onDislike={() => handleVote("downvote")}
              className="hidden md:flex"
            >
            </LikeButton>
          }
        </div>

        <Content className="flex flex-col gap-2 self-stretch">
          {!editable ?
            <PostContent content={content} createdAt={createdAt}></PostContent>
            :
            <PostContentForm
              content={content}
              onContentChange={onContentChange!}
              isSubmiting={isSubmiting}
              handleSubmit={handleSubmit}
              onCancel={() => navigate(`/post/${id}`)}
            >
            </PostContentForm>
          }
        </Content>
      </PostWrapper>

      <CommentSection postId={id} comments={post.comments}></CommentSection>

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