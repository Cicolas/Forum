import { useEffect, useState } from "react";
import { getAllPost } from "../../api/postAPI";
import { PostListing } from "../../components/PostListing";
import { IPost } from "../../shared/interfaces/post";
import { Container } from "../../components/Container";

export function Recent() {
  const [ posts, setPosts ] = useState<IPost[] | undefined>(undefined);

  useEffect(() => {
    getAllPost()
      .then(setPosts)
      .catch(err => {throw new Error(err)})
  }, [setPosts]);

  return (<Container>
    <PostListing
      title="Últimos posts"
      posts={posts??[]}
    >
    </PostListing>
  </Container>
  )
}