import { KeyReturn } from "phosphor-react";
import { Container } from "../../components/atoms/Container/Container";
import { useState } from "react";
import { LikeButton } from "../../components/molecules/LikeButton/LikeButton";
import { UserLink } from "../../components/atoms/UserLink/UserLink";
import { Comment } from "./components/Comment";
import { useLoaderData } from "react-router-dom";
import { IPost } from "../../utils/interfaces/post";
import dayjs from "dayjs";
import { VoteType } from "../../utils/types/vote";
import { IComment } from "../../utils/interfaces/comment";
import LikeService from "../../services/LikeService";
import { CategoryChip } from "../../components/molecules/Chips/CategoryChip";
import { TextArea } from "../../components/atoms/TextArea/TextArea";
import { Title } from "../../components/atoms/Title/Title";
import { Label } from "../../components/atoms/Label/Label";
import { Spacer } from "../../components/atoms/Spacer/Spacer";
import { Content } from "../../components/atoms/Content/Content";
import { List } from "../../components/atoms/List/List";
import { Bullet } from "../../components/atoms/Bullet/Bullet";

const _comment: IComment = {
  id: "12345",
  parentId: "1234",
  author: "cicolas",
  content: "é muito e massa",
  rank: {upVotes: [], downVotes: []},
  createdAt: 0,
  lastUpdate: 0
}

export function PostPage() {
  const post = useLoaderData() as IPost;
  const [likeState, setLikeState] = useState<VoteType>("undefined");
  const [comment, setComment] = useState<string>("");

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
        <Spacer>
          <UserLink to="cicolas">
            {post?.author}
          </UserLink>
          &nbsp;
          <Label light>em</Label>
          &nbsp;
          <CategoryChip
            name="Brasil"
            color="#6d8c003f"
          ></CategoryChip>
          &nbsp;
          <CategoryChip
            name="Humor"
            color="#c23c0c3f"
          ></CategoryChip>
        </Spacer>
        <Title size="3.5xl" className="leading-tight">{post?.title}</Title>
      </div>

      <LikeButton
        count={24}
        orientation="horizontal"
        state={likeState}
        onLike={handleVote.bind(undefined, "upvote")}
        onDislike={handleVote.bind(undefined, "downvote")}
        className="hidden md:inline"
      >
      </LikeButton>
    </div>

    <Content className="flex flex-col gap-2 self-stretch">
      {post?.content}

      <Spacer className="text-silver-chalice-400 font-serif">
        <Label>
          {dayjs(post?.created_at).format("HH:mm")}
        </Label>
        &nbsp;
        <Bullet/>
        &nbsp;
        <Label>
          {dayjs(post?.created_at).locale("pt-br").format('DD[ de ]MMMM[ de ]YYYY')}
        </Label>
      </Spacer>
    </Content>

    <Content>
      <div className="pb-2 self-stretch border-b-2 border-solid border-silver-chalice-400">
        <Title className="tracking-wider">Comentários</Title>
      </div>

      <div className="flex flex-row pr-4 pl-1 pt-4 content-between items-center self-stretch gap-2">
        <TextArea
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
          placeholder="Adicionar um Comentário"
          minHeight="2.5em"
          className="flex-grow flex-shrink-0"
          borderless
        >
        </TextArea>

        <KeyReturn size={32} className="text-silver-chalice-400 cursor-pointer">
        </KeyReturn>
      </div>
    </Content>

    <List>
      <Comment value={_comment}></Comment>
    </List>
  </Container>
}