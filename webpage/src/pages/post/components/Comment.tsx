import dayjs from "dayjs";
import { LikeButton } from "../../../components/LikeButton";
import { UserLink } from "../../../components/UserLink";

type CommentProps = {
  user: {
    id?: string
    name: string,
  };
  content: string;
  timestamp: Date;
}

export function Comment({
  user,
  content,
  timestamp
}: CommentProps) {
  return <div className="flex flex-col py-0 px-2 items-start gap-4 self-stretch">
    <div className="flex items-start gap-2 self-stretch">
      <LikeButton count={24} orientation="vertical" state="downvote">
      </LikeButton>
      <div className="flex flex-col items-start gap-2 flex-grow flex-shrink-0 text-base tracking-wider leading-normal">
        <UserLink id={user.id}>{user.name}</UserLink>

        <span className="font-roboto">
          {content}
        </span>

        <div className="flex items-start gap-2 text-silver-chalice-400">
          <span className="font-bold text-shark-950 cursor-pointer">Responder</span>
          <span>{dayjs(timestamp).format('HH:mm')}</span>
          <span>•</span>
          <span>{dayjs(timestamp).locale("pt-br").format('DD[ de ]MMMM[ de ]YYYY')}</span>
        </div>
      </div>
    </div>
  </div>
}