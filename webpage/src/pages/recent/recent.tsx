import { Feed } from "../../components/Feed";
import { IPost } from "../../shared/interfaces/post";

const posts: IPost[] = [
  {
    id: "1234",
    title: "Teste muito absurdo",
    author: "Cicolas",
    content: "",
    created_at: new Date(),
    last_update: new Date()
  }
]

export function Recent() {
  return (
    <Feed title="Últimos posts" posts={posts}>
    </Feed>
  )
}