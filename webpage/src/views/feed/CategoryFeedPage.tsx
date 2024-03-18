import { PostListing } from "../../components/molecules/PostListing/PostListing";
import { Container } from "../../components/atoms/Container/Container";
import { IPost } from "../../utils/interfaces/post";
import { useLoaderData, useParams } from "react-router-dom";

export function CategoryFeedPage() {
  const { categoryName } = useParams();

  const posts = useLoaderData() as IPost[];

  return (<Container>
      <PostListing
        title="Últimos posts"
        posts={posts??[]}
        where={{name: categoryName??"", description: "", color: "#10101010"}}
        newPostAble
      >
      </PostListing>
  </Container>)
}