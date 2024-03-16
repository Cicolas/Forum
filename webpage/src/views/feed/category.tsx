import { PostListing } from "../../components/PostListing";
import { Container } from "../../components/Container";
import { IPost } from "../../utils/interfaces/post";
import { useLoaderData, useParams } from "react-router-dom";
import { CategoryChip } from "../../components/Chips/CategoryChips";

export function Category() {
  const { categoryName } = useParams();

  const posts = useLoaderData() as IPost[];

  return (<Container>
      <PostListing
        title="Últimos posts"
        posts={posts??[]}
        where={<CategoryChip name={categoryName??""} color="#6d8c003f" />}
      >
      </PostListing>
  </Container>)
}