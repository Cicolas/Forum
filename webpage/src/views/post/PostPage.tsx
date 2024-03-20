import { useLoaderData } from "react-router-dom";
import { PostLayout } from "../../components/organisms/PostLayout/PostLayout";
import { IThread } from "../../utils/interfaces/thread";

export function PostPage() {
  const post = useLoaderData() as IThread;

  return <PostLayout
    post={post}
    likable
  >
  </PostLayout>
}