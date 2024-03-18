import { useLoaderData } from "react-router-dom";
import { IPost } from "../../utils/interfaces/post";
import { PostLayout } from "../../components/organisms/PostLayout/PostLayout";

// const _comment: IComment = {
//   id: "12345",
//   parentId: "1234",
//   author: "cicolas",
//   content: "é muito e massa",
//   rank: {upVotes: [], downVotes: []},
//   createdAt: 0,
//   lastUpdate: 0
// }

export function PostPage() {
  const post = useLoaderData() as IPost;

  return <PostLayout
    id={post.id}
    title={post.title}
    author={post.author}
    categories={[]}
    content={post.content}
    createdAt={post.createdAt}
    likable
  >
  </PostLayout>
}