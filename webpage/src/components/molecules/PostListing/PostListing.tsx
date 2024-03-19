import { Link } from "react-router-dom";
import { IPost } from "../../../utils/interfaces/post";
import { UserLink } from "../../atoms/UserLink/UserLink";
import { PlusCircle } from "phosphor-react";
import { CategoryChip } from "../Chips/CategoryChip";
import { ICategory } from "../../../utils/interfaces/category";
import { Label } from "../../atoms/Label/Label";
import { Spacer } from "../../atoms/Spacer/Spacer";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

type FeedProps = {
  title: string;
  posts: IPost[];
  where?: ICategory;
  newPostAble?: boolean;
};

function PostListItem(post: IPost) {
  return <div key={post.id} className="flex flex-col py-2 items-start gap-1 self-stretch border-b-2 border-solid border-silver-chalice-400 border-opacity-25">
    <div className="flex items-center gap-2">
      <Link to={`/post/${post.id}`} className="text-2xl font-normal leading-normal cursor-pointer">{post.title}</Link>

      <CategoryChip
        name="Brasil"
        color="#6d8c003f"
      ></CategoryChip>
      <CategoryChip
        name="Humor"
        color="#c23c0c3f"
      ></CategoryChip>
    </div>
    <div className="text-silver-chalice-400 font-normal word-spacing-2">
      <UserLink to={post.author} className="word-spacing-normal">Nícolas Carvalho</UserLink>
      <span className="font-light "> há </span>
      <span className="word-spacing-normal">15 dias</span>
    </div>
  </div>
}

export function PostListing({
  title,
  posts,
  where,
  newPostAble
}: FeedProps) {
  const newPostLink = "/post/new" + (where ? `?categoryName=${where?.name}` : "");

  const { permissions } = useContext(AuthContext);
  const canCreate = permissions.includes("create-contribution");

  return <>
    <div className="flex justify-between items-center self-stretch">
      <Spacer>
        <h1 className="word-spacing-normal font-bold text-2xl inline">{title}</h1>
        {where && <>
          <span className="text-silver-chalice-400 font-light"> em </span>
          <CategoryChip name={where.name} color={where.color}></CategoryChip>
        </>}
      </Spacer>
      <div className="flex items-baseline gap-2 text-silver-chalice-400 italic cursor-pointer">
        {newPostAble && canCreate &&
          <Link className="word-spacing-2" to={newPostLink}>
            <Label color="light-gray" italic>Novo Post</Label>
            &nbsp;
            <PlusCircle
              size={20}
              weight="bold"
              className="self-center text-shark-950 inline"
            ></PlusCircle>
          </Link>
        }
      </div>
    </div>

    <div className="flex flex-col items-start self-stretch">
      {posts.map(PostListItem)}
    </div>
  </>
}