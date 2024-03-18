import dayjs from "dayjs";
import { LikeButton } from "../../../components/molecules/LikeButton/LikeButton";
import { UserLink } from "../../../components/atoms/UserLink/UserLink";
import { useState } from "react";
import { VoteType } from "../../../utils/types/vote";
import { IComment } from "../../../utils/interfaces/comment";
import { countRank } from "../../../utils/countRank";
import LikeService from "../../../services/LikeService";
import { Spacer } from "../../../components/atoms/Spacer/Spacer";
import { Label } from "../../../components/atoms/Label/Label";
import { Content } from "../../../components/atoms/Content/Content";
import { Bullet } from "../../../components/atoms/Bullet/Bullet";

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
      <Content className="flex flex-col items-start gap-2 flex-grow flex-shrink-0">
        <UserLink className="font-serif" to={value.author}>{value.author}</UserLink>

        {value.content}

        <Spacer className="font-serif text-silver-chalice-400">
          <Label color="black" bold pointer>Responder</Label>
          &nbsp;
          <Label className="hidden md:inline">
            {dayjs(value.createdAt).format('HH:mm')}
          </Label>
          &nbsp;
          <Bullet/>
          &nbsp;
          <Label className="hidden md:inline">
            {dayjs(value.createdAt).locale("pt-br").format('DD[ de ]MMMM[ de ]YYYY')}
          </Label>
        </Spacer>
      </Content>
    </div>
  </div>
}