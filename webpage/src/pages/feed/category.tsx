import { useState, useEffect } from "react";
import { getAllPostCategory as getAllPostByCategory } from "../../api/postAPI";
import { PostListing } from "../../components/PostListing";
import { useQuery } from "../../shared/hooks/useQuery";
import { IPost } from "../../shared/interfaces/post";
import { CategoryChips } from "../../components/CategoryChips";

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

  return (
    <PostListing
      title="Últimos posts"
      posts={posts??[]}
      where={<CategoryChips name={queryParams.get("name")??""} color="#6d8c003f" />}
    >
    </PostListing>
  )
}