import { IComment } from "./interfaces/comment";
import { IPost } from "./interfaces/post";

export function countRank(post: IPost | IComment) {
  if (!post.upVotes && !post.downVotes) return 0;
  if (!post.upVotes) return -post.downVotes.length;
  if (!post.downVotes) return post.upVotes.length;

  return post.upVotes?.length - post.downVotes?.length;
}