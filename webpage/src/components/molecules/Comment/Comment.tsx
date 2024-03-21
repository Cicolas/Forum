import dayjs from "dayjs";
import { LikeButton } from "../LikeButton/LikeButton";
import { UserLink } from "../../atoms/UserLink/UserLink";
import { useContext, useEffect, useState } from "react";
import { VoteType } from "../../../utils/types/vote";
import { IComment } from "../../../utils/interfaces/comment";
import { countRank } from "../../../utils/countRank";
import { Spacer } from "../../atoms/Spacer/Spacer";
import { Label } from "../../atoms/Label/Label";
import { Content } from "../../atoms/Content/Content";
import { Bullet } from "../../atoms/Bullet/Bullet";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { PaperPlaneRight } from "phosphor-react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { timestampToDate } from "../../../utils/types/timestamp";
import CommentService from "../../../services/CommentService";
import { voteContribution } from "../../../utils/voting";
import { getUserRankState } from "../../../utils/getUserRankState";

type CommentProps = {
  comment: IComment;
}

export function Comment({
  comment,
}: CommentProps) {
  const { user, permissions } = useContext(AuthContext);

  const canReply = permissions?.includes("create-contribution")??false;

  const {
    id,
    author,
    content,
    createdAt,
    replies,
  } = comment;

  const [ likeState, setLikeState ] = useState<VoteType>();
  const [ hasVoted, setHasVoted ] = useState<VoteType>();

  const [ isReplying, setIsReplying ] = useState(false);

  const [ reply, setReply ] = useState("");
  const [ repliesList, setRepliesList ] = useState<IComment[]>(replies);

  useEffect(() => {
    if (user) {
      const rank = getUserRankState(comment, user.id);
      setLikeState(rank);
      setHasVoted(rank);
    }
  }, [user, comment]);

  const handleVote = async (rank: VoteType) => {
    voteContribution({
      user,
      contributionId: id,
      rank,
      likeState,
      setLikeState
    });
  }

  const handleReply = async() => {
    if (!user) {
      toast.error("Você precisa estar logado para comentar.");
      return;
    }

    if (reply) {
      try {
        const response = await CommentService.createComment({
          parentId: id,
          authorId: user!.id,
          content: reply
        });

        setRepliesList(prev => ([...prev, response]));
        setReply("");
        setIsReplying(false);
      } catch (error) {
        toast.error("Erro ao enviar comentário.");
      }
    }
  }

  return <div className="flex flex-col py-0 px-2 items-start gap-4 self-stretch">
    <div className="flex items-start gap-2 self-stretch">
      <LikeButton
        count={countRank(comment)}
        orientation="vertical"
        state={likeState}
        hasVoted={hasVoted}
        onLike={handleVote.bind(undefined, "upvote")}
        onDislike={handleVote.bind(undefined, "downvote")}
      >
      </LikeButton>
      <Content className="flex flex-col items-start gap-2 flex-grow flex-shrink-0">
        <UserLink className="font-serif" to={author}>{author.name}</UserLink>

        {content}

        <Spacer className="font-serif text-silver-chalice-400">
          <button onClick={() => setIsReplying(!isReplying && canReply)}>
            <Label color="black" bold pointer>Responder</Label>
          </button>
          &nbsp;
          <Label className="hidden md:inline">
            {dayjs(timestampToDate(createdAt)).format('HH:mm')}
          </Label>
          &nbsp;
          <Bullet/>
          &nbsp;
          <Label className="hidden md:inline">
            {dayjs(timestampToDate(createdAt)).locale("pt-br").format('DD[ de ]MMMM[ de ]YYYY')}
          </Label>
        </Spacer>

        {isReplying && <div className="flex w-full gap-4 items-center">
          <TextArea
            value={reply}
            onChange={(ev) => setReply(ev.target.value)}
            placeholder="Adicionar um Comentário"
            minHeight="2.5em"
            className="flex-grow flex-shrink-0"
            borderless
          >
          </TextArea>

          <PaperPlaneRight
            onClick={handleReply}
            size={24}
            className="text-silver-chalice-400 cursor-pointer"
          >
          </PaperPlaneRight>
        </div>}


        <div className="flex flex-col gap-4">
          {repliesList.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </Content>
    </div>
  </div>
}