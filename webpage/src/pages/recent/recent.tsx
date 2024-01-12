import { useEffect, useState } from "react";
import { PostListing } from "../../components/PostListing";
import { IPost } from "../../shared/interfaces/post";
import { getAllPost } from "../../api/postAPI";

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