import { PostListing } from "../../components/molecules/PostListing/PostListing";
import { IPost } from "../../utils/interfaces/post";
import { Container } from "../../components/atoms/Container/Container";
import { useQuery } from "../../hooks/useQuery";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostService from "../../services/PostService";

export function FeedPage() {
  const query = useQuery();

  const [ posts, setPosts ] = useState<IPost[]>();
  const author = query.get("author");
  const title = query.get("title");
  const listingTitle = `Busca por '${title??""}${(title && author) ? "' em '": ""}${author??""}'`

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getAllPost({
          title: title??undefined,
          author: author??undefined,
        })

        setPosts(response);
      } catch (error) {
        if (error instanceof Error)
          toast.error(error.message);
      }
    }

    fetchPosts();
  }, [author, title, setPosts])


  return (<Container>
    <PostListing
      title={listingTitle}
      posts={posts??[]}
      newPostAble
    >
    </PostListing>
  </Container>
  )
}