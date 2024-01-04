import { IComment } from "../interfaces/comment";
import { IPost } from "../interfaces/post";

export function countRank(post: IPost | IComment) {
  return post.rank.upVotes.length + post.rank.downVotes.length;
}