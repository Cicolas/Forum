import { PostListing } from "../../components/molecules/PostListing/PostListing";
import { Container } from "../../components/atoms/Container/Container";
import { IPost } from "../../utils/interfaces/post";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PostService from "../../services/PostService";
import { useQuery } from "../../hooks/useQuery";

export function CategoryFeedPage() {
  const { categoryName } = useParams();
  const query = useQuery();

  const color = query.get("color");

  const [ posts, setPosts ] = useState<IPost[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getAllPost({
          category: categoryName??""
        })

        setPosts(response);
      } catch (error) {
        if (error instanceof Error)
          toast.error(error.message);
      }
    }

    fetchPosts();
  }, [categoryName, setPosts])


  return (<Container>
      <PostListing
        title="Últimos posts"
        posts={posts??[]}
        where={{
          name: categoryName??"",
          description: "",
          color: (color?.replace("0x", "#"))??"#a6a6a640"
        }}
        newPostAble
      >
      </PostListing>
  </Container>)
}