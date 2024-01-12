import { Link } from "react-router-dom";
import { IPost } from "../shared/interfaces/post";
import { CategoryChips } from "./CategoryChips";
import { Container } from "./Container";
import { UserLink } from "./UserLink";
import { ReactElement } from "react";
import { PlusCircle } from "phosphor-react";

type FeedProps = {
  title?: string;
  posts: IPost[];
  where?: ReactElement;
};

function PostListItem(post: IPost) {
  return <div className="flex flex-col py-2 items-start gap-1 self-stretch border-b-2 border-solid border-silver-chalice-400 border-opacity-25">
    <div className="flex items-center gap-2">
      <Link to={`/post/${post.id}`} className="text-2xl font-normal leading-normal cursor-pointer">{post.title}</Link>

      <CategoryChips
        name="Brasil"
        color="#6d8c003f"
      ></CategoryChips>
      <CategoryChips
        name="Humor"
        color="#c23c0c3f"
      ></CategoryChips>
    </div>
    <div className="flex items-start gap-2 text-silver-chalice-400 font-normal">
      <UserLink id={post.author}>Nícolas Carvalho</UserLink>
      <span className="font-light">há</span>
      <span>15 dias</span>
    </div>
  </div>
}

export function PostListing({
  title,
  posts,
  where
}: FeedProps) {
  return <Container>
    <div className="flex justify-between items-center self-stretch">
      <div className="flex items-end gap-2">
        <h1 className="font-bold text-2xl">{title??""}</h1>
        {where && <>
          <span className="text-silver-chalice-400 font-light">em</span>
          {where}
        </>}
      </div>
      <div className="flex items-baseline gap-2 text-silver-chalice-400 italic cursor-pointer">
        <span>Novo Post</span>
        <PlusCircle size={20} weight="bold" className="self-center text-shark-950"></PlusCircle>
      </div>
    </div>

    <div className="flex flex-col items-start self-stretch">
      {posts.map(PostListItem)}
    </div>
  </Container>
}