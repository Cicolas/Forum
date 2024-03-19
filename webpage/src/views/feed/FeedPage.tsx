import { PostListing } from "../../components/molecules/PostListing/PostListing";
import { IPost } from "../../utils/interfaces/post";
import { Container } from "../../components/atoms/Container/Container";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";

export function FeedPage() {
  const query = useQuery();
  const posts = useLoaderData() as IPost[];

  const author = query.get("author");
  const title = query.get("title");
  const listingTitle = `Busca por '${title??""}${(title && author) ? "' em '": ""}${author??""}'`

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