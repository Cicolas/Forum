import { KeyReturn } from "phosphor-react";
import { Container } from "../../components/Container";
import { FormEvent, useState } from "react";
import { LikeButton } from "../../components/LikeButton";
import { CategoryChip } from "../../components/Chips/CategoryChips";
import { UserLink } from "../../components/UserLink";
import { Comment } from "./components/Comment";
import { useLoaderData } from "react-router-dom";
import { IPost } from "../../utils/interfaces/post";
import dayjs from "dayjs";
import { VoteType } from "../../utils/types/vote";
import { IComment } from "../../utils/interfaces/comment";
import LikeService from "../../services/LikeService";

const comment: IComment = {
  id: "12345",
  parentId: "1234",
  author: "cicolas",
  content: "é muito e massa",
  rank: {upVotes: [], downVotes: []},
  createdAt: 0,
  lastUpdate: 0
}

export function Post() {
  const post = useLoaderData() as IPost;
  const [ likeState, setLikeState ] = useState<VoteType>("undefined");

  const handleVote = (vote: VoteType) => {
    if (!post) return;

    const action = vote === "upvote" ? LikeService.likePost : LikeService.dislikePost;

    action(post?.id).then(() => {
      if (likeState === vote)
        setLikeState("undefined");
      else
        setLikeState(vote);
    });
  }

  return <Container className="py-4">
    <div className="flex flex-row justify-between items-center self-stretch">
      <div className="flex flex-col items-start gap-1">
        <div className="flex flex-row gap-2 items-center">
          <UserLink id="cicolas">{post?.author}</UserLink>
          <span className="font-light">em</span>

          <CategoryChip
            name="Brasil"
            color="#6d8c003f"
          ></CategoryChip>
          <CategoryChip
            name="Humor"
            color="#c23c0c3f"
          ></CategoryChip>
        </div>
        <h1 className="font-bold text-3.5xl leading-tight">{post?.title}</h1>
      </div>
      <div className="hidden md:inline">
        <LikeButton
          count={24}
          orientation="horizontal"
          state={likeState}
          onLike={handleVote.bind(undefined, "upvote")}
          onDislike={handleVote.bind(undefined, "downvote")}
        >
        </LikeButton>
      </div>
    </div>

    <div className="flex flex-col items-start gap-2 self-stretch text-base leading-5 tracking-wider">
      <p className="text-justify font-roboto">
        {post?.content}
      </p>

      <div className="flex flex-row gap-2 text-silver-chalice-400">
        <span>{dayjs(post?.created_at).format("HH:mm")}</span>
        <span>•</span>
        <span>{dayjs(post?.created_at).locale("pt-br").format('DD[ de ]MMMM[ de ]YYYY')}</span>
      </div>
    </div>

    <div className="flex flex-col items-start gap-8 self-stretch">
      <div className="flex flex-col gap-4 self-stretch items-start">
        <div className="flex flex-row items-start gap-2 pb-2 self-stretch border-b-2 border-solid border-silver-chalice-400">
          <h2 className="font-bold text-2xl tracking-wider leading-normal">Comentários</h2>
        </div>

        <div className="flex flex-row pr-4 pl-1 min-h-[1.5rem] gap-4 content-between items-center self-stretch">
          <textarea
            className="flex-grow flex-shrink-0 font-roboto text-base tracking-wider leading-normal pt-1 resize-none placeholder-silver-chalice-400"
            placeholder="Adicionar Um comentário"
            onInput={autoResizeTextArea}
            rows={1}
          >
          </textarea>

          <span className="text-shark-950 cursor-pointer"><KeyReturn size={32}></KeyReturn></span>
        </div>
      </div>

      <Comment value={comment}></Comment>
    </div>
  </Container>
}