import { useNavigate } from "react-router-dom";
import { IPost } from "../shared/interfaces/post";
import { CategoryChips } from "./CategoryChips";
import { Container } from "./Container";
import { UserLink } from "./UserLink";

type FeedProps = {
  title?: string;
  posts: IPost[]
};

function PostListItem(post: IPost) {
  const navigate = useNavigate();

  return <div className="flex flex-col py-2 items-start gap-1 self-stretch border-b-2 border-solid border-silver-chalice-400 border-opacity-25">
    <div className="flex items-center gap-2">
      <h2 onClick={() => {navigate(`/post/${post.id}`)}} className="text-2xl font-normal leading-normal cursor-pointer">{post.title}</h2>

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

export function Feed({
  title,
  posts,
}: FeedProps) {
  return <Container>
    {title && <h1 className="font-bold text-2xl">{title}</h1>}

    <div className="flex flex-col items-start self-stretch">
      {posts.map(PostListItem)}
    </div>
  </Container>
}