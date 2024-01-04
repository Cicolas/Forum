import { useEffect, useState } from "react";
import { Feed } from "../../components/Feed";
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
    <Feed title="Últimos posts" posts={posts??[]}>
    </Feed>
  )
}