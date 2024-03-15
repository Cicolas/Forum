import { useState, useEffect } from "react";
import { getAllPostByCategory } from "../../services/PostService";
import { PostListing } from "../../components/PostListing";
import { useQuery } from "../../hooks/useQuery";
import { IPost } from "../../utils/interfaces/post";
import { CategoryChips } from "../../components/CategoryChips";
import { Container } from "../../components/Container";

export function Category() {
  const queryParams = useQuery();
  const [ posts, setPosts ] = useState<IPost[] | undefined>(undefined);

  useEffect(() => {
    const categoryName = queryParams.get("name");

    if (!categoryName) return;

    getAllPostByCategory(categoryName)
      .then(setPosts)
      .catch(err => {throw new Error(err)})
  }, [queryParams, setPosts]);

  return (<Container>
      <PostListing
        title="Últimos posts"
        posts={posts??[]}
        where={<CategoryChips name={queryParams.get("name")??""} color="#6d8c003f" />}
      >
      </PostListing>
  </Container>)
}