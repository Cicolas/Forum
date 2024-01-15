import { useParams } from "react-router-dom";
import { Container } from "../../components/Container";
import dayjs from "dayjs";
import { PostListing } from "../../components/PostListing";
import { useEffect, useState } from "react";
import { IPost } from "../../shared/interfaces/post";
import { getAllPostByUser } from "../../api/postAPI";

const DATA = new Date();

function UserDetails() {
  return <div className="flex py-4 items-center gap-4 self-stretch">
    <img className="w-16 rounded-full" src="https://avatars.githubusercontent.com/u/32042329?v=4" />
    <div className="flex flex-col items-start gap-2 leading-5">
      <h1 className="font-bold text-2xl">Nícolas Carvalho</h1>
      <span className="font-light text-silver-chalice-400 ">
        Membro desde:
        <span className="font-normal"> {dayjs(DATA).locale("pt-br").format('MMMM[ de ]YYYY')}</span>
      </span>
    </div>
  </div>
}

export function UserFeed() {
  const { userId } = useParams();
  const [ posts, setPosts ] = useState<IPost[] | undefined>(undefined);

  useEffect(() => {
    if (!userId) throw new Error("Invalid User");

    getAllPostByUser(userId)
      .then(setPosts)
      .catch(err => {throw new Error(err)})
  }, [userId, setPosts]);

  return <Container>
    <UserDetails></UserDetails>
    <PostListing title="Atividade" posts={posts??[]}></PostListing>
  </Container>
}