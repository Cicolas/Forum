import { IComment } from "./interfaces/comment";
import { IPost } from "./interfaces/post";

export function getUserRankState(contribution: IPost | IComment, userId: string) {
  if (contribution.upVotes.includes(userId)) return "upvote";
  if (contribution.downVotes.includes(userId)) return "downvote";

  else return "canceled";
}