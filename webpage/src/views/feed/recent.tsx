import { PostListing } from "../../components/PostListing";
import { IPost } from "../../utils/interfaces/post";
import { Container } from "../../components/Container";
import { useLoaderData } from "react-router-dom";

export function Recent() {
  const posts = useLoaderData() as IPost[];

  return (<Container>
    <PostListing
      title="Últimos posts"
      posts={posts??[]}
    >
    </PostListing>
  </Container>
  )
}