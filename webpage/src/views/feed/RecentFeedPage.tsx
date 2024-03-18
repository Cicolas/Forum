import { PostListing } from "../../components/molecules/PostListing/PostListing";
import { IPost } from "../../utils/interfaces/post";
import { Container } from "../../components/atoms/Container/Container";
import { useLoaderData } from "react-router-dom";

export function RecentFeedPage() {
  const posts = useLoaderData() as IPost[];

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