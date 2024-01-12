import { useEffect, useState } from "react";
import { getAllPost } from "../../api/postAPI";
import { PostListing } from "../../components/PostListing";
import { IPost } from "../../shared/interfaces/post";

export function Recent() {
  const [ posts, setPosts ] = useState<IPost[] | undefined>(undefined);

  useEffect(() => {
    getAllPost()
      .then(setPosts)
      .catch(err => {throw new Error(err)})
  }, [setPosts]);

  return (
    <PostListing
      title="Últimos posts"
      posts={posts??[]}
    >
    </PostListing>
  )
}