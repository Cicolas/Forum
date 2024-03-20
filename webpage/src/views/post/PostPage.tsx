import { useParams } from "react-router-dom";
import { PostLayout } from "../../components/organisms/PostLayout/PostLayout";
import { IThread } from "../../utils/interfaces/thread";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostService from "../../services/PostService";

export function PostPage() {
  const { postId } = useParams();

  const [ post, setPost ] = useState<IThread>();

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const thread = await PostService.getPostById(postId as string);
        setPost(thread);
      } catch (error) {
        if (error instanceof Error)
          toast.error(error.message);
      }
    }

    fetchThread();
  }, [postId]);

  return <>
  {post &&
    <PostLayout
      post={post}
      likable
    >
    </PostLayout>
  }
  </>
}