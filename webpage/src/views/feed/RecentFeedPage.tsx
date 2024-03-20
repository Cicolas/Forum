import { PostListing } from "../../components/molecules/PostListing/PostListing";
import { IPost } from "../../utils/interfaces/post";
import { Container } from "../../components/atoms/Container/Container";
import { useEffect, useState } from "react";
import PostService from "../../services/PostService";
import { toast } from "react-toastify";

export function RecentFeedPage() {
  const [ posts, setPosts ] = useState<IPost[]>();

  PostService.getAllPost

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await PostService.getAllPost();
        setPosts(posts);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    }

    fetchPosts();
  }, []);

  return (<Container>
    <PostListing
      title="Últimos posts"
      posts={posts??[]}
      newPostAble
    >
    </PostListing>
  </Container>
  )
}