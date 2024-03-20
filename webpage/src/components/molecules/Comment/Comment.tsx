import dayjs from "dayjs";
import { LikeButton } from "../LikeButton/LikeButton";
import { UserLink } from "../../atoms/UserLink/UserLink";
import { useContext, useState } from "react";
import { VoteType } from "../../../utils/types/vote";
import { IComment } from "../../../utils/interfaces/comment";
import { countRank } from "../../../utils/countRank";
import LikeService from "../../../services/LikeService";
import { Spacer } from "../../atoms/Spacer/Spacer";
import { Label } from "../../atoms/Label/Label";
import { Content } from "../../atoms/Content/Content";
import { Bullet } from "../../atoms/Bullet/Bullet";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { KeyReturn, PaperPlaneRight } from "phosphor-react";
import { CommentService } from "../../../services/CommentService";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { timestampToDate } from "../../../utils/types/timestamp";

type CommentProps = {
  comment: IComment;
}

export function Comment({
  comment,
}: CommentProps) {
  const { user, permissions } = useContext(AuthContext);

  const canReply = permissions?.includes("create-contribution") || true;

  const {
    id,
    author,
    content,
    createdAt,
    replies,
  } = comment;

  const [ likeState, setLikeState ] = useState<VoteType>("undefined");
  const [ isReplying, setIsReplying ] = useState(false);
  const [ reply, setReply ] = useState("");

  const handleVote = (vote: VoteType) => {
    const action = vote === "upvote" ? LikeService.likeComment : LikeService.dislikeComment;

    action(comment.id).then(() => {
      if (likeState === vote)
        setLikeState("undefined");
      else
        setLikeState(vote);
    });
  }

  const handleReply = () => {
    if (!user) {
      toast.error("Você precisa estar logado para comentar.");
      return;
    }

    if (reply) {
      CommentService.createComment({
        parentId: comment.id,
        authorId: user!.id,
        content: reply
      });

      setReply("");
      setIsReplying(false);
    }
  }

  return <div className="flex flex-col py-0 px-2 items-start gap-4 self-stretch">
    <div className="flex items-start gap-2 self-stretch">
      <LikeButton
        count={countRank(comment)}
        orientation="vertical"
        state={likeState}
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
          {replies.map((comment) => (
            <Comment key={id} comment={comment} />
          ))}
        </div>
      </Content>
    </div>
  </div>
}