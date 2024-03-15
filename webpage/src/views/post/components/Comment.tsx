import dayjs from "dayjs";
import { LikeButton } from "../../../components/LikeButton";
import { UserLink } from "../../../components/UserLink";
import { useState } from "react";
import { VoteType } from "../../../utils/types/vote";
import { IComment } from "../../../utils/interfaces/comment";
import { countRank } from "../../../utils/countRank";
import LikeService from "../../../services/LikeService";

type CommentProps = {
  value: IComment;
}

export function Comment({
  value,
}: CommentProps) {
  const [ likeState, setLikeState ] = useState<VoteType>("undefined");

  const handleVote = (vote: VoteType) => {
    const action = vote === "upvote" ? LikeService.likeComment : LikeService.dislikeComment;

    action(value.id).then(() => {
      if (likeState === vote)
        setLikeState("undefined");
      else
        setLikeState(vote);
    });
  }

  return <div className="flex flex-col py-0 px-2 items-start gap-4 self-stretch">
    <div className="flex items-start gap-2 self-stretch">
      <LikeButton
        count={countRank(value)}
        orientation="vertical"
        state={likeState}
        onLike={handleVote.bind(undefined, "upvote")}
        onDislike={handleVote.bind(undefined, "downvote")}
      >
      </LikeButton>
      <div className="flex flex-col items-start gap-2 flex-grow flex-shrink-0 text-base tracking-wider leading-normal">
        <UserLink id={value.author}>{value.author}</UserLink>

        <span className="font-roboto">
          {value.content}
        </span>

        <div className="flex items-start gap-2 text-silver-chalice-400">
          <span className="font-bold text-shark-950 cursor-pointer">Responder</span>
          <span className="hidden md:inline">{dayjs(value.createdAt).format('HH:mm')}</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">{dayjs(value.createdAt).locale("pt-br").format('DD[ de ]MMMM[ de ]YYYY')}</span>
        </div>
      </div>
    </div>
  </div>
}