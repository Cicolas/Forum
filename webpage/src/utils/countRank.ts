import { IRank } from "../interfaces/rank";

export function countRank(post: { rank: IRank }) {
  return post.rank.upVotes.length + post.rank.downVotes.length;
}